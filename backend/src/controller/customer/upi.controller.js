import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Role } from "../../model/role.model.js";
import { Upi } from "../../model/upi.model.js";

import { roles } from "../../utils/constants.js";

// add upi id
const addUpi = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { upi } = req.body;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const existingUpi = await Upi.findOne({ upi: upi });
  if (existingUpi) {
    throw new ApiError(403, "upi id already exists");
  }

  const upi = await Upi.create({
    userid: userid,
    upi: upi,
  });
  if (!upi) {
    throw new ApiError(402, "adding upi id failed");
  }

  const allUpi = await Upi.find({ userid: userid, visibility: true });
  if (!allUpi) {
    throw new ApiError(404, "user has no saved upi id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "upi id added successfully", allUpi));
});

// fetch all upi id of user
const fetchUpi = AsyncHandler(async (req, res) => {
  const userid = req.user._id;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const allUpi = await Upi.find({ userid: userid, visibility: true });
  if (!allUpi) {
    throw new ApiError(404, "user has no saved upi id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "all upi id fetched successfully", allUpi));
});

// remove a upi id
const removeUpi = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const { upiid } = req.params;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const upi = await Upi.findByIdAndUpdate(
    upiid,
    { visibility: false },
    { returnDocument: "after" },
  );
  if (!upi) {
    throw new ApiError(402, "removing upi failed");
  }

  const allUpi = await Upi.find({ userid: userid, visibility: true });
  if (!allUpi) {
    throw new ApiError(404, "user has no saved upi id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "removed upi id successfully", allUpi));
});

export { addUpi, fetchUpi, removeUpi };
