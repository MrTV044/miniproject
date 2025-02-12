// feedbackController.js
import { Request, Response, NextFunction } from "express";
import { logger } from "../middleware/error-middleware";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new feedback
export async function CreateFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { review, rating, eventId, userId } = req.body;

  if (!review || !rating) {
    const errorMessage = "Missing required review or rating";
    logger(errorMessage);
    res.status(400).json({ message: errorMessage });
    return;
  }

  try {
    const CreateFeedback = await prisma.feedBack.create({
      data: {
        review,
        rating,
        eventId,
        userId,
      },
    });
    res.status(201).json({ ok: true, data: CreateFeedback });
  } catch (error) {
    console.error("Error creating feedback:", error);
    next(error);
  }
}

// Get all feedback for a specific event
export async function GetSingleFeedbacks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { eventId } = req.params;

  try {
    const GetSingleFeedbacks = await prisma.feedBack.findMany({
      where: { eventId: Number(eventId) },
      include: { User: true }, // Include user information if needed
    });
    res.status(200).json({ ok: true, data: GetSingleFeedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    next(error);
  }
}

// Update feedback
export async function UpdateFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { review, rating } = req.body;

  try {
    const UpdateFeedback = await prisma.feedBack.update({
      where: { id: Number(id) },
      data: {
        review,
        rating,
      },
    });
    res.status(200).json({ ok: true, data: UpdateFeedback });
  } catch (error) {
    console.error("Error updating feedback:", error);
    next(error);
  }
}
