import express from "express";
import { GetWallet, TopUpWallet } from "../controllers/wallet-controller";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router
  .route("/:id")
  .get(GetWallet)
  .post(verifyToken, roleGuard("CUSTOMER"), TopUpWallet);

export default router;
