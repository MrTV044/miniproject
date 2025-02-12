import express from "express";
import { GetOrganizerEvents } from "../controllers/event-statistic-controller";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router.route("/organizer-events").get(verifyToken, GetOrganizerEvents);

// router.route("/organizer-events").get(GetOrganizerEvents);

// router
//   .route("/organizer-order")
//   .get(verifyToken, roleGuard("ORGANIZER"), GetOrganizerOrder);

export default router;
