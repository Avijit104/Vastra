import { body } from "express-validator";

const upiValidator = () => {
  return [body("upi").trim().notEmpty().withMessage("upi id is required")];
};

export { upiValidator };
