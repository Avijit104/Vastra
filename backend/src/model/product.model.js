import mongoose, { Schema } from "mongoose";
import { availableCategory, availableKeywords } from "../utils/constants.js";

const productSchema = new Schema(
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
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: [
        {
          type: String,
          enum: availableCategory,
        },
      ],
      required: true,
    },
    keywords: {
      type: [
        {
          type: String,
          enum: availableKeywords,
        },
      ],
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0.0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("product", productSchema);
