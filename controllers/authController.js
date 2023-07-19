const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authController = {
  register: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ msg: "Username already taken" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({
        msg: "User registered successfully",
        user: newUser,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
      user.lastLogin = new Date();
      await user.save();
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "12h",
        }
      );
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;
