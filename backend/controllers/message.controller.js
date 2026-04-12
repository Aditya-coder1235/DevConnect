const Message = require("../models/message.model");

async function sendMessage(req, res) {

    const { conversationId, text } = req.body;

    try {

        const newMessage = new Message({
            conversationId,
            sender: req.user.id,
            text
        });

        const savedMessage = await newMessage.save();

        res.status(200).json(savedMessage);

    } catch (error) {
        res.status(500).json(error);
    }
}


async function getMessages(req, res) {

    const { conversationId } = req.params;

    try {

        const messages = await Message.find({
            conversationId
        })
            .populate({
                path: "conversationId",
                populate: {
                    path: "members",
                    select: "name email avatar"
                }
            });

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { sendMessage, getMessages }