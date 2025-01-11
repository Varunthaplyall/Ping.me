import { Router } from "express";
const router = Router();
import authController from "../controllers/auth.controllers.js";
import userValidator from "../controllers/validations.js";
import protectedRoute from "../middlewares/protectedRoute.js";

router.post("/register", userValidator, authController.register);
router.post("/login", authController.login);
router.put("/update-profile", protectedRoute, authController.updateProfile);
router.get("/verify", protectedRoute, authController.verify);

export default router;
