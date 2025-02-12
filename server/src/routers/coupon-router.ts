import express from "express";
import { postCoupon } from "../controllers/coupon-controller";

const router = express.Router();

router.route("/postCoupon").post(postCoupon);

export default router;
