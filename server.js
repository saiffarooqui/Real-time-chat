const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const Chat = require("./models/chatModel");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

io.on("connection", (socket) => {
  socket.on("join", async ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.join(decoded.userId);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired
        socket.emit("error", { msg: "Token has expired" });
      } else {
        // Invalid token or other error
        socket.emit("error", { msg: "Invalid token" });
      }
      socket.disconnect();
    }
  });

  socket.on("sendMessage", async (message, options) => {
    try {
      const decoded = jwt.verify(options.token, process.env.JWT_SECRET);
      const newMessage = new Chat({ username: decoded.username, message });
      await newMessage.save();
      io.emit("newMessage", newMessage);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired
        socket.emit("error", { msg: "Token has expired" });
      } else {
        // Error saving message or broadcasting to chat room
        socket.emit("error", { msg: "Error sending message" });
      }
    }
  });
});

// Connect to mongodb
const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });
  })
  .catch((error) => console.log(error));
