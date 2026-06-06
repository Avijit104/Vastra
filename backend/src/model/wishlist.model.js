import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true },
);

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
