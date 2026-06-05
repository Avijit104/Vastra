import mongoose, { Schema } from "mongoose";
import { availableOrderStatus, orderStatus } from "../utils/constants";

const orderSchema = new Schema(
  {
    sellerid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    customerid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    productid: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    status: {
      type: String,
      default: orderStatus.placed,
      enum: availableOrderStatus,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("order", orderSchema);
