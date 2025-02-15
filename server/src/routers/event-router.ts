import express from "express";
import {
  getAllEvent,
  getSingleEvent,
  createEvent,
} from "../controllers/event-controller";
import { upload } from "../middleware/upload-middleware";
import { roleGuard, verifyToken } from "../middleware/authorization-middleware";

const router = express.Router();

router
  .route("/")
  .get(getAllEvent)
  .post(
    verifyToken,
    roleGuard("ORGANIZER"),
    upload.single("image"),
    createEvent
  );
router.route("/:id").get(getSingleEvent);

export default router;
