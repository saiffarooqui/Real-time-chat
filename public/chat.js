const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("message-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("message").value;

  // Send message to server
  socket.emit("sendMessage", message, { token });

  // Clear input field
  document.getElementById("message").value = "";
});

socket.on("newMessage", (data) => {
  // Add new message to chat list
  const li = document.createElement("li");
  li.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(li);
});

socket.on("error", (data) => {
  // Show error message to user
  alert(data.msg);
});

// Join chat room with token from local storage
const token = localStorage.getItem("token");
socket.emit("join", { token });
