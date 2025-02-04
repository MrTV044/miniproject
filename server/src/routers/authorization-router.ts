import express from "express";
import { CreateUser, login, logout } from "../controllers/authorization";

const router = express.Router();
router.route("/sign-up").post(CreateUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
