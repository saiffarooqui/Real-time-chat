const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/messages", authMiddleware, chatController.createMessage);
router.get("/messages", authMiddleware, chatController.listMessages);

module.exports = router;
