import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    productid: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model("cart", cartSchema);
