import express from "express";
import { GetOrganizerEventsandOrders } from "../controllers/event-statistic-controller";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router.route("/organizer-events").get(verifyToken, GetOrganizerEventsandOrders);

// router.route("/organizer-events").get(GetOrganizerEvents);

// router
//   .route("/organizer-order")
//   .get(verifyToken, roleGuard("ORGANIZER"), GetOrganizerOrder);

export default router;
