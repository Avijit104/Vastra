import { Router } from "express";

import {
  addWishlist,
  fetchWishlist,
  removeWishlist,
} from "../../controller/customer/whislist.controller.js";

import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

router.route("/").get(jwtValidator, fetchWishlist);
router
  .route("/:productid")
  .get(jwtValidator, addWishlist)
  .delete(jwtValidator, removeWishlist);

export default router;
