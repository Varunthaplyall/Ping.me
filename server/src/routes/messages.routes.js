import { Router } from "express";
const router = Router();
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/messages.controller.js";
import protectedRoute from "../middlewares/protectedRoute";

router.get("/", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);
router.post("/:id", protectedRoute, sendMessage);

export default router;
