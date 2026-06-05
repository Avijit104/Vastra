import mongoose, { Schema } from "mongoose";
import { availableRole } from "../utils/constants.js";

const roleSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    role: {
      type: String,
      required: true,
      enum: availableRole,
    },
  },
  { timestamps: true },
);

export const Role = mongoose.model("role", roleSchema);
