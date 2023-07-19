const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const chatController = {
  createMessage: async (req, res) => {
    try {
      const { message } = req.body;
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const newMessage = new Chat({ username: user.username, message });
      await newMessage.save();
      res.status(201).json({
        msg: "Message created successfully",
        message: newMessage,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  listMessages: async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const messages = await Chat.find({ createdAt: { $gte: user.lastLogin } });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = chatController;
