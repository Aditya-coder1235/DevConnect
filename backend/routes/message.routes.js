const express = require("express")
const router = express.Router()

const {
    sendMessage,
    getMessages
} = require("../controllers/message.controller")

const isAuth = require("../middleware/auth.middleware")

router.post("/", isAuth, sendMessage)

router.get("/:conversationId", isAuth, getMessages)

module.exports = router