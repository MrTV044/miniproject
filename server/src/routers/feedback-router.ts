import express from "express";
import { addFeedback, getFeedback } from "../controllers/feedback-controller";

const router = express.Router();

router.route("/reviews").post(getFeedback);
router.route("/events/:eventId/reviews").get(getFeedback);

export default router;
