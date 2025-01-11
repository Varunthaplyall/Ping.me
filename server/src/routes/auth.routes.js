const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const userValidator = require("../controllers/validations");
const protectedRoute = require("../middlewares/protectedRoute.js");

router.post("/register", userValidator, authController.register);
router.post("/login", authController.login);
router.put("/update-profile", protectedRoute, authController.updateProfile);
router.get("/verify", protectedRoute, authController.verify);

module.exports = router;
