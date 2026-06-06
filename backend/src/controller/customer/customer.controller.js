import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Customer } from "../../model/customer.model.js";
import { Role } from "../../model/role.model.js";

import { roles } from "../../utils/constants.js";

// customer signup
const signup = AsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phno, gender } = req.body;
  const existingUser = await User.findOne({ email: email });
  const userRole = await Role.findOne({
    userid: existingUser._id,
    role: roles.customer,
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (userRole && existingUser) {
    throw new ApiError(401, "user already exists");
  } else if (existingUser) {
    const userData = await Customer.create({
      userid: existingUser._id,
      firstName: firstName,
      lastName: lastName,
      phno: phno,
      gender: gender,
    });
    if (!userData) {
      throw new ApiError(401, "user registration failed");
    }

    const refreshToken = User.generateDataTokens(roles.customer);
    const accessToken = User.generateDataTokens(roles.customer);
    existingUser.refreshToken = refreshToken;

    await existingUser.save({ validateBeforeSave: true });
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(200, "user registration successful", {
          user: existingUser,
          userData: userData,
          role: roles.customer,
        }),
      );
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const session = await mongoose.startSession();
    try {
      const user = await User.create({
        email: email,
        password: hashedPassword,
      });
      const role = await Role.create({
        userid: user._id,
        role: roles.customer,
      });
      const userData = await Customer.create({
        userid: user._id,
        firstname: firstName,
        lastName: lastName,
        phno: phno,
        gender: gender,
      });

      const refreshToken = user.generateDataTokens(roles.customer);
      const accessToken = user.generateDataTokens(roles.customer);
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      await session.commitTransaction();
      await session.endSession();
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
          new ApiResponse(200, "user registration successful", {
            user: user,
            userData: userData,
            role: roles.customer,
          }),
        );
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(401, "user registration failed");
    }
  }
});

// update user details
const updateCustomer = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { firstName, lastName, phno } = req.body;

  const userData = await Customer.findOneAndUpdate(
    { userid: userid },
    { firstname: firstName, lastName: lastName, phno: phno },
    { returnDocument: "after" },
  );

  if (!userData) {
    throw new ApiError(404, "cusstomer not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "customer details updated successfully", {
      userData: userData,
    }),
  );
});

export { signup, updateCustomer };
