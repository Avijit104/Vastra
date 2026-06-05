import { body } from "express-validator";
import { availableRole } from "../../utils/constants.js";

const loginValidator = () => {
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
      .withMessage("passwrd must be atleast 8 character long"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .isIn(availableRole)
      .withMessage("invalid role"),
  ];
};

const sendOtpValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .isIn(availableRole)
      .withMessage("invalid role"),
  ];
};

const loginOtpValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .isIn(availableRole)
      .withMessage("invalid role"),
    body("otp")
      .notEmpty()
      .withMessage("otp is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("otp must be 6 characters long"),
  ];
};

const changePasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("passwrd must be atleast 8 character long"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("passwrd must be atleast 8 character long"),
  ];
};

export {
  loginValidator,
  sendOtpValidator,
  loginOtpValidator,
  changePasswordValidator,
};
