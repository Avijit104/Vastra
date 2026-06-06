import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";

import { User } from "../../model/user.model.js";
import { Role } from "../../model/role.model.js";
import { Business } from "../../model/business.model.js";
import { Customer } from "../../model/customer.model.js";

import { roles, addressType } from "../../utils/constants.js";

// get user data
const fetchUser = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;

  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const userRole = await Role.findOne({ userid: userid, role: role });
  if (!userRole) {
    throw new ApiError(409, "unauthorized access");
  }

  if (role === roles.customer) {
    const userData = await Customer.findOne({ userid: userid });
    if (!userData) {
      throw new ApiError(404, "user data not found");
    }
    return res.status(200).json(
      new ApiResponse(200, "user fetched successfully", {
        user: user,
        userData: userData,
        role: role,
      }),
    );
  } else if (role === roles.seller) {
    const userData = await Business.findOne({
      userid: userid,
      visibility: true,
    }).populate({
      path: "address",
      match: { visibility: true, addressType: addressType.business },
    });
    if (!userData) {
      throw new ApiError(404, "business data not found");
    }
    return res.status(200).json(
      new ApiResponse(200, "user fetched successfully", {
        user: user,
        userData: userData,
        role: role,
      }),
    );
  }
});

// user login
const login = AsyncHandler(async (req, res) => {
  const { email, password, Role } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const userRole = await Role.findOne({
    userid: user._id,
    role: role,
  });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    throw new ApiError(409, "incorrect login credentials");
  }

  const refreshToken = user.generateDataTokens(role);
  const accessToken = user.generateDataTokens(role);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (userRole === roles.customer) {
    const userData = await Customer.findOne({ userid: user._id });
    if (!userData) {
      throw new ApiError(404, "user data not found");
    }
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "user login successful", {
          user: user,
          userData: userData,
          role: userRole.role,
        }),
      );
  }
  if (userRole === roles.seller) {
    const userData = await Business.findOne({
      userid: user._id,
      visibility: true,
    }).populate({
      path: "address",
      match: { visibility: true, addressType: addressType.business },
    });
    if (!userData) {
      throw new ApiError(404, "user data not found");
    }
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "user login successful", {
          user: user,
          userData: userData,
          role: userRole.role,
        }),
      );
  }
});

// sending otp for login
const sendOtp = AsyncHandler(async (req, res) => {
  const { email, role } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const userRole = await Role.findOne({ userid: user._id, role: role });
  if (!userRole) {
    throw new ApiError(409, "unauthorized access");
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  return res
    .status(200)
    .json(new ApiResponse(200, "otp send successful", hashedOtp));
});

// login using otp
const loginOtp = AsyncHandler(async (req, res) => {
  const { email, role, hashedOtp, otp } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const userRole = await Role.findOne({ userid: user._id, role: role });
  if (!userRole) {
    throw new ApiError(409, "unauthorized access");
  }

  const validateOtp = await bcrypt.compare(otp, hashedOtp);
  if (!validateOtp) {
    throw new ApiError(401, "wrong otp");
  }

  const refreshToken = user.generateDataTokens(role);
  const accessToken = user.generateDataTokens(role);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (role === roles.customer) {
    const userData = await Customer.findOne({ userid: user._id });
    if (!userData) {
      throw new ApiError(404, "user data not found");
    }
    return res.status(200).json(
      new ApiResponse(200, "user login successful", {
        user: user,
        userData: userData,
        role: role,
      }),
    );
  } else if (role === roles.seller) {
    const userData = await Business.findOne({
      userid: user._id,
      visibility: true,
    }).populate({
      path: "address",
      match: {
        visibility: true,
        assressType: addressType.business,
      },
    });
    if (!userData) {
      throw new ApiError(404, "business data not found");
    }
    return res.status(200).json(
      new ApiResponse(200, "user login successful", {
        user: user,
        userData: userData,
        role: role,
      }),
    );
  }
});

// logout
const logout = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;

  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const userRole = await Role.findOne({ userid: userid, role: role });
  if (!userRole) {
    throw new ApiError(409, "unauthorized access");
  }

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user logout successful"));
});

// update user emmail
const updateEmail = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { email } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(401, "email id already registered");
  }

  const userRole = await Role.findOne({ userid: userid, role: role });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const user = await User.findByIdAndUpdate(
    userid,
    { email: email },
    { returnDocument: "after" },
  );

  return res.status(200).json(200, "email updated successful", { user: user });
});

// change password
const changePassword = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const passwordValidation = await bcrypt.compare(oldPassword, user.password);
  if (!passwordValidation) {
    throw new ApiError(403, "invalid credentials");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "password changed successfully"));
});

export {
  login,
  fetchUser,
  sendOtp,
  loginOtp,
  updateEmail,
  logout,
  changePassword,
};
