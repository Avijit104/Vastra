import mongoose, { Schema } from "mongoose";
import { availableGender, gender } from "../utils/constants.js";

const customerSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phno: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: availableGender,
    },
  },
  { timestamps: true },
);

export const Customer = mongoose.model("customer", customerSchema);
