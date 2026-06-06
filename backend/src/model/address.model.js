import mongoose, { Schema } from "mongoose";
import { addressTypes, availableAddressType } from "../utils/constants.js";

const addressSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phno: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    building: {
      type: String,
      trim: true,
      default: "",
    },
    landmark: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    pin: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    addressType: {
      type: String,
      enum: availableAddressType,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("address", addressSchema);
