import { Router } from "express";

import {
addCart,
fetchCart,
removeCart
} from "../../controller/customer/cart.controller.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router.route("/").get(jwtValidator, fetchCart);
router
  .route("/:productid")
  .get(jwtValidator, addCart)
  .delete(jwtValidator, removeCart);

export default router;
