import mongoose, { Schema } from "mongoose";
import { availablePriority, priority } from "../utils/constants";

const advertisementSchema = new Schema(
  {
    productid: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    header: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: availablePriority,
      default: priority.low,
    },
    expiry: {
      type: Date,
      required: true,
    },
    visiblility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Advertisement = mongoose.model(
  "advertisemnet",
  advertisementSchema,
);
