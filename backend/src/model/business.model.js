import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema(
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
    gstin: {
      type: String,
      required: true,
      teim: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "address",
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Business = mongoose.model("business", businessSchema);
