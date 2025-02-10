import express from "express";
import {
  register,
  login,
  logout,
  getRole,
} from "../controllers/authorization-controller";

const router = express.Router();

router.route("/register").post(register).get(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getroles").get(getRole);

export default router;
