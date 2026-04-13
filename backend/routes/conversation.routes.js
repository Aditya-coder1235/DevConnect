const express = require("express");
const router = express.Router();

const {
    createConversation,
    getUserConversations
} = require("../controllers/conversation.controller");
const isAuth = require("../middleware/auth.middleware");

router.post("/start/:id", isAuth, createConversation);
router.get("/:userId", isAuth, getUserConversations);

module.exports = router;