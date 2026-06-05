import mongoose, { Schema } from "mongoose";
import { addressType, availableAddressType } from "../utils/constants";

const addressSchema = new Schema(
  {
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
      type: Bollean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("address", addressSchema);
