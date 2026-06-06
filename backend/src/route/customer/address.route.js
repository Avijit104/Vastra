import { Router } from "express";

import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controller/customer/address.controller.js";

import {
  addAddressValidator,
  editAddressValidator,
} from "../../validators/customer/address.validator.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router
  .route("/")
  .get(jwtValidator, fetchAllAddress)
  .post(jwtValidator, addAddressValidator(), validator, addAddress);

router
  .route("/:addressid")
  .put(jwtValidator, editAddressValidator(), validator, editAddress)
  .delete(jwtValidator, deleteAddress);

export default router;
