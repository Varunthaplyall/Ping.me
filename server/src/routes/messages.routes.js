const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages.controller.js");
const protectedRoute = require("../middlewares/protectedRoute");

router.get("/", protectedRoute, messageController.getUsersForSidebar);
router.get("/:id", protectedRoute, messageController.getMessages);
router.post("/:id", protectedRoute, messageController.sendMessage);

module.exports = router;
