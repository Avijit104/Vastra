import { Router } from "express";

import {
  addCard,
  fetchCard,
  editCard,
  removeCard,
} from "../../controller/customer/card.controller.js";

import { cardValidator } from "../../validators/customer/card.validator.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router
  .route("/")
  .get(jwtValidator, fetchCard)
  .post(jwtValidator, cardValidator(), validator, addCard);

router
  .route("/:cardid")
  .put(jwtValidator, cardValidator(), validator, editCard)
  .delete(jwtValidator, removeCard);

export default router;
