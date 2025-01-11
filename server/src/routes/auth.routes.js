import { Router } from "express";
const router = Router();
import {
  register,
  login,
  updateProfile,
  verify,
} from "../controllers/auth.controllers";
import userValidator from "../controllers/validations";
import protectedRoute from "../middlewares/protectedRoute.js";

router.post("/register", userValidator, register);
router.post("/login", login);
router.put("/update-profile", protectedRoute, updateProfile);
router.get("/verify", protectedRoute, verify);

export default router;
