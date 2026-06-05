// module
import jwt from "jsonwebtoken";

// utility
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// model
import { User } from "../model/user.model.js";
import { Role } from "../model/role.model.js";

// jwt token validator
export const jwtValidator = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "token is missing");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -email -firstName -lastName -gender -isVerified -refreshToken -resetPasswordToken -resetPasswordTokenExpiry -emailVerificationToken -emailVerificationTokenExpiry -createdAt -updatedAt -__v",
    );

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    req.user = user;
    req.role = decodedToken.role;
    next();
  } catch (error) {
    throw new ApiError(401, "invalid access token");
  }
});
