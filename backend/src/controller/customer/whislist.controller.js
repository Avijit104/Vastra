import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Wishlist } from "../../model/wishlist.model.js";
import { Role } from "../../model/role.model.js";
import { Product } from "../../model/product.model.js";

import { roles } from "../../utils/constants.js";

// add to wishlist
const addWishlist = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { productid } = req.params;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const existingProduct = await Product.findById(productid);
  if (!existingProduct) {
    throw new ApiError(404, "product not found");
  }

  const wish = await Wishlist.create({ userid: userid, productid: productid });
  if (!wish) {
    throw new ApiError(401, "adding to wishlist failed");
  }

  const wishlist = await Wishlist.find({ userid: userid }).populate({
    path: "product",
    match: {
      visibility: true,
    },
  });
  if (wishlist.length === 0) {
    throw new ApiError(402, "user has no wishlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "adding to wishlist successful", wishlist));
});

// get full wishlist
const fetchWishlist = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const wishlist = await Wishlist.find({ userid: userid }).populate({
    path: "product",
    match: {
      visibility: true,
    },
  });
  if (wishlist.length === 0) {
    throw new ApiError(402, "user has no wishlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "user wishlist fetched successfully", wishlist));
});

// remove from wishlist
const removeWishlist = AsyncHandler(async (req, res) => {
  const userid = req.user._id;
  const role = req.role;
  const { productid } = req.params;

  const userRole = await Role.findOne({ userid: userid, role: roles.customer });
  if (!userRole) {
    throw new ApiError(404, "user not found");
  }

  const wish = await Wishlist.findOneAndDelete({
    userid: userid,
    productid: productid,
  });
  if (!wish) {
    throw new ApiError(401, "remove from wishlist failed");
  }

  const wishlist = await Wishlist.find({ userid: userid }).populate({
    path: "product",
    match: {
      visibility: true,
    },
  });
  if (wishlist.length === 0) {
    throw new ApiError(402, "user has no wishlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "remove form wishlist is successful", wishlist));
});

export { addWishlist, fetchWishlist, removeWishlist };
