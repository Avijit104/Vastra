import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Address } from "../../model/address.model.js";
import { Role } from "../../model/role.model.js";

import { addressTypes, roles } from "../../utils/constants.js";

// add address
const addAddress = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const {
    name,
    phno,
    street,
    building,
    landmark,
    city,
    district,
    pin,
    state,
    addressType,
  } = req.body;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const newAddress = await Address.create({
    userid: userid,
    name: name,
    phno: phno,
    street: street,
    building: building,
    landmark: landmark,
    city: city,
    district: district,
    pin: pin,
    state: state,
    addressType: addressType,
  });

  const allAddress = await Address.find({ userid: userid, visibility: true });

  if (allAddress.length === 0) {
    throw new ApiError(401, "add address failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "adding address successful", allAddress));
});

// get all address
const fetchAllAddress = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const allAddress = await Address.find({ userid: userid, visibility: true });

  if (allAddress.length === 0) {
    throw new ApiError(402, "address fetching failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "fetching all address successful", allAddress));
});

// edit address
const editAddress = AsyncHandler(async (req, res) => {
  const { addressid } = req.params;
  const userid = req.user._id;
  const role = req.role;
  const { name, phno, street, building, landmark, city, district, pin, state } =
    req.body;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user nor found");
  }
  const checkAddress = await Address.findOne({
    userid: userid,
    _id: addressid,
  });
  if (!checkAddress) {
    throw new ApiError(409, "unauthorized access");
  }

  await Address.findByIdAndUpdate(addressid, {
    name: name,
    phno: phno,
    street: street,
    building: building,
    landmark: landmark,
    city: city,
    district: district,
    pin: pin,
    state: state,
  });

  const allAddress = await Address.find({ userid: userid, visibility: true });
  if (allAddress.length === 0) {
    throw new ApiError(401, "address updation failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "address updation successful", allAddress));
});

// delete address
const deleteAddress = AsyncHandler(async (req, res) => {
  const { addressid } = req.params;
  const userid = req.user._id;
  const role = req.role;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const checkAddress = await Address.findOne({
    userid: userid,
    _id: addressid,
  });
  if (!checkAddress) {
    throw new ApiError(409, "unauthorized access");
  }

  checkAddress.visibility = false;
  await checkAddress.save({ validateBeforeSave: false });

  const allAddress = await Address.find({ userid: userid, visibility: true });

  return res
    .status(200)
    .json(new ApiResponse(200, "address delete successful", allAddress));
});

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
