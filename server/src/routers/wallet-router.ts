import express from "express";
import { GetWallet, TopUpWallet } from "../controllers/wallet-controller";

const router = express.Router();

router.route("/").get(GetWallet).post(TopUpWallet);

export default router;
