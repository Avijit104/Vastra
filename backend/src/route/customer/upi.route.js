import { Router } from "express";

import {
  addUpi,
  fetchUpi,
  removeUpi,
} from "../../controller/customer/upi.controller.js";

import { upiValidator } from "../../validators/customer/upi.validator.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router
  .route("/")
  .get(jwtValidator, fetchUpi)
  .post(jwtValidator, upiValidator(), validator, addUpi);

router.route("/:upiid").delete(jwtValidator, removeUpi);

export default router;
