import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: String,
    resetPassword: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true },
);

userSchema.methods.generateDataTokens = function (role) {
  return jwt.sign(
    {
      _id: this._id,
      role: role,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    },
  );
};

userSchema.methods.generateTokens = function () {
  const unhashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const expiry = Date.now() + 1000 * 60 * 20;
  return { unhashedToken, hashedToken, expiry };
};

export const User = mongoose.model("user", userSchema);
