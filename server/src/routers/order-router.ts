import express from "express";
import { CreateOrder, getAllOrder } from "../controllers/order-controller";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, roleGuard("CUSTOMER"), getAllOrder)
  .post(verifyToken, roleGuard("CUSTOMER"), CreateOrder);

export default router;
