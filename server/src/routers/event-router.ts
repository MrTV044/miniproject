import express from "express";
import { getAllEvent, getSingleEvent } from "../controllers/event-controller";

const router = express.Router();
router.route("/").get(getAllEvent);
router.route("/:id").get(getSingleEvent);
export default router;
