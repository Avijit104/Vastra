import { Router } from "express";

// controllers
import {
  login,
  fetchUser,
  sendOtp,
  loginOtp,
  changePassword,
} from "../../controller/user/user.controller.js";

// validators
import {
  loginValidator,
  sendOtpValidator,
  loginOtpValidator,
  changePasswordValidator,
} from "../../validators/user/user.validator.js";

// middleware
import { jwtValidator } from "../../middleware/jwtValidator.middle.js";
import { validator } from "../../middleware/validator.middle.js";

const router = Router();

// unsecure routes
router.route("/login").post(loginValidator(), validator, login);

router.route("/send-otp").post(sendOtpValidator(), validator, sendOtp);

router.route("/login-otp").post(loginOtpValidator(), validator, loginOtp);

// secure rooutes
router.route("/").get(jwtValidator, fetchUser);

router
  .route("/change-password")
  .put(changePasswordValidator(), validator, changePassword);

// export
export default router;
