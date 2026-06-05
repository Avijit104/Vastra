// module
import { validationResult } from "express-validator";

// utility
import { ApiError } from "../utils/ApiError";

// user data validator
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractErrors = [];
  errors.array().map((err) => extractErrors.push(err));
  throw new ApiError(
    422,
    `validation error :: ${extractErrors[0].msg}`,
    extractErrors,
  );
};

export { validator };
