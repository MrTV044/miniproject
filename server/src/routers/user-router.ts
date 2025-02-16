import express from "express";
import { GetCurrentUser } from "../controllers/user-controller";
import { verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router.route("/").get(verifyToken, GetCurrentUser);

export default router;
