import { body } from "express-validator";
import { availableGender } from "../../utils/constants";

const signupValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be atleast 8 character long"),
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name is required")
      .isLength({ min: 3 })
      .withMessage("first name must be atleast 3 character long"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name is required")
      .isLength({ min: 3 })
      .withMessage("last name must be atleast 3 character long"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phone number is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phone number must be 10 character long"),
    body("gender")
      .notEmpty()
      .withMessage("gender is required")
      .isIn(availableGender)
      .withMessage("invalid gender"),
  ];
};

const updateCustomerValidator = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name is required")
      .isLength({ min: 3 })
      .withMessage("first name must be atleast 3 character long"),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name is required")
      .isLength({ min: 3 })
      .withMessage("last name must be atleast 3 character long"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phone number is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phone number must be 10 character long"),
  ];
};

export { signupValidator, updateCustomerValidator };
