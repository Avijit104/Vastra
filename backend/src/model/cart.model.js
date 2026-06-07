import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model("cart", cartSchema);
