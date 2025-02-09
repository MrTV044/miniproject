import express from "express";
import { postCoupon, userPatch } from "../controllers/coupon-controller";

const router = express.Router();

router.route("/postCoupon").post(postCoupon);
router.route("/patchUserCoupon").patch(userPatch);

export default router;
