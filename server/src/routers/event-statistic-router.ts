import express from "express";
import { GetOrganizerEvents } from "../controllers/event-statistic-controller";

const router = express.Router();

router.route("/organizer-events").get(GetOrganizerEvents);

export default router;
