import { Router } from "express";
const router = Router();
import messageController from "../controllers/messages.controller.js";
import protectedRoute from "../middlewares/protectedRoute.js";

router.get("/", protectedRoute, messageController.getUsersForSidebar);
router.get("/:id", protectedRoute, messageController.getMessages);
router.post("/:id", protectedRoute, messageController.sendMessage);

export default router;
