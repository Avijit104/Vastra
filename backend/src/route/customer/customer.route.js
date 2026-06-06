import { Router } from "express";

import {
  signup,
  updateCustomer,
} from "../../controller/customer/customer.controller.js";

import {
  signupValidator,
  updateCustomerValidator,
} from "../../validators/customer/customer.validator.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router.route("/signup").post(signupValidator(), validator, signup);

router
  .route("/update")
  .put(jwtValidator, updateCustomerValidator(), validator, updateCustomer);

export default router;
