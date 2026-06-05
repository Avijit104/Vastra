import mongoose, { Schema } from "mongoose";

const upiSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    upi: {
      type: String,
      required: true,
      trim: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Upi = mongoose.model("upi", upiSchema);
