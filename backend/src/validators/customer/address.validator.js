import { body } from "express-validator";
import { availableAddressType } from "../../utils/constants.js";

const addAddressValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name is too short"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phno is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phno must be 10 characters long"),
    body("street")
      .trim()
      .notEmpty()
      .withMessage("street is required")
      .isLength({ max: 256 })
      .withMessage("street too long"),
    body("building")
      .trim()
      .optional()
      .isLength({ max: 20 })
      .withMessage("building name or number at most 10 characters long"),
    body("landmark")
      .trim()
      .notEmpty()
      .withMessage("landmark is required")
      .isLength({ max: 100 })
      .withMessage("landmark is too long"),
    body("city")
      .trim()
      .notEmpty()
      .withMessage("city is required")
      .isLength({ max: 20 })
      .withMessage("city name is too long"),
    body("district")
      .trim()
      .notEmpty()
      .withMessage("city is required")
      .isLength({ max: 20 })
      .withMessage("city name is too long"),
    body("pin")
      .trim()
      .notEmpty()
      .withMessage("pin is required")
      .isLength({ max: 6, min: 6 })
      .withMessage("invalid pin code"),
    body("state")
      .trim()
      .notEmpty()
      .withMessage("state is required")
      .isLength({ max: 20 })
      .withMessage("state name too long"),
    body("addressType")
      .notEmpty()
      .withMessage("address type is required")
      .isIn(availableAddressType)
      .withMessage("invalid address type"),
  ];
};

const editAddressValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name is too short"),
    body("phno")
      .trim()
      .notEmpty()
      .withMessage("phno is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("phno must be 10 characters long"),
    body("street")
      .trim()
      .notEmpty()
      .withMessage("street is required")
      .isLength({ max: 256 })
      .withMessage("street too long"),
    body("building")
      .trim()
      .optional()
      .isLength({ max: 20 })
      .withMessage("building name or number at most 10 characters long"),
    body("landmark")
      .trim()
      .notEmpty()
      .withMessage("landmark is required")
      .isLength({ max: 100 })
      .withMessage("landmark is too long"),
    body("city")
      .trim()
      .notEmpty()
      .withMessage("city is required")
      .isLength({ max: 20 })
      .withMessage("city name is too long"),
    body("district")
      .trim()
      .notEmpty()
      .withMessage("city is required")
      .isLength({ max: 20 })
      .withMessage("city name is too long"),
    body("pin")
      .trim()
      .notEmpty()
      .withMessage("pin is required")
      .isLength({ max: 6, min: 6 })
      .withMessage("invalid pin code"),
    body("state")
      .trim()
      .notEmpty()
      .withMessage("state is required")
      .isLength({ max: 20 })
      .withMessage("state name too long"),
  ];
};

export { addAddressValidator, editAddressValidator };
