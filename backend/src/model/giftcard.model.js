import mongoose, { Schema } from "mongoose";

const giftcardSchema = new Schema(
  {
    uesrid: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    value: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const Giftcard = mongoose.model("giftcard", giftcardSchema);
