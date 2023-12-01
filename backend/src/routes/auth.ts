import express from "express";
import {
  login,
  logout,
  refresh,
  register,
  verifyCode,
  sendVerificationCode,
} from "../controllers/auth";
import loginLimiter from "../middleware/login-limiter";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").get(logout);
router.route("/send-code").post(sendVerificationCode);
router.route("/verify-code").post(verifyCode);

export default router;
