import express from "express";
import {
  GetOrganizerEvents,
  GetOrganizerOrder,
} from "../controllers/event-statistic-controller";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router
  .route("/organizer-events")
  .get(verifyToken, roleGuard("ORGANIZER"), GetOrganizerEvents);

router
  .route("/organizer-events")
  .get(verifyToken, roleGuard("ORGANIZER"), GetOrganizerOrder);


export default router;
