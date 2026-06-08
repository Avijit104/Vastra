import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Role } from "../../model/role.model.js";
import { Card } from "../../model/card.model.js";

import { roles } from "../../utils/constants.js";

// adding a card
const addCard = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { cardno, cvv, expiry } = req.body;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const existingCard = await Card.findOne({ cardno: cardno });
  if (existingCard) {
    throw new ApiError(402, "card already exists");
  }

  const card = await Card.create({
    userid: userid,
    cardno: cardno,
    cvv: cvv,
    expiry: expiry,
  });
  if (!card) {
    throw new ApiError(402, "adding card failed");
  }

  const allCard = await Card.find({ userid: userid, visibility: true });
  if (!allCard) {
    throw new ApiError(404, "user has no saved cards");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "adding card successful", allCard));
});

// get all card for user
const fetchCard = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const allCard = await Card.find({ userid: userid, visibility: true });
  if (!allCard) {
    throw new ApiError(404, "user hsa no saved cards");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "fetched all cards successfully", allCard));
});

// edit a card
const editCard = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { cardid } = req.params;
  const { cardno, cvv, expiry } = req.body;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const editedCard = await Card.findByIdAndUpdate(
    cardid,
    {
      cardno: cardno,
      cvv: cvv,
      expiry: expiry,
    },
    { returnDocument: "after" },
  );
  if (!editCard) {
    throw new ApiError(402, "edit a card failed");
  }

  const allCard = await Card.find({ userid: userid, visibility: true });
  if (!allCard) {
    throw new ApiError(404, "user has no saved card");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "edit a card successful", allCard));
});

// remove a card
const removeCard = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { cardid } = req.params;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const card = await Card.findByIdAndUpdate(
    cardid,
    {
      visibility: false,
    },
    { returnDocument: "after" },
  );
  if (!card) {
    throw new ApiError(402, "removing a card failed");
  }

  const allCard = await Card.find({ userid: userid, visibility: true });
  if (!allCard) {
    throw new ApiError(404, "user has no saved cards");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "removing a card successful", allCard));
});

export { addCard, fetchCard, editCard, removeCard };
