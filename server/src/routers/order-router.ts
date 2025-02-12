import express from "express";
import { CreateOrder, getOrder } from "../controllers/order-controller";

const router = express.Router();

router.route("/").get(getOrder).post(CreateOrder);

export default router;
