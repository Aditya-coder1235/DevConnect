const Conversation = require("../models/conversation.model");


async function createConversation(req, res) {

    const senderId = req.user.id;
    const receiverId = req.params.id;

    try {

        const existingConversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId]
        });

        const savedConversation = await newConversation.save();

        res.status(200).json(savedConversation);

    } catch (error) {
        res.status(500).json(error);
    }
}


async function getUserConversations(req, res) {

    const userId = req.params.userId;

    try {

        const conversations = await Conversation.find({
            members: { $in: [userId] }
        }).populate("members", "name avatar email");

        res.status(200).json(conversations);

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createConversation,
    getUserConversations
};