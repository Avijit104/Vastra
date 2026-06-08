import { body } from "express-validator";

const cardValidator = () => {
  return [
    body("cardno")
      .trim()
      .notEmpty()
      .withMessage("cardno is required")
      .isLength({ max: 16, min: 16 })
      .withMessage("invalid card no"),
    body("cvv")
      .trim()
      .notEmpty()
      .withMessage("cvv is required")
      .isLength({ min: 3, max: 3 })
      .withMessage("invalid cvv"),
    body("expiry").notEmpty().withMessage("expiry date is required"),
  ];
};

export { cardValidator };
