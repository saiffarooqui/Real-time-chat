# Real-time Chat Application

This is a real-time chat application built with Node.js, Express, MongoDB, and Socket.IO.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd Real-time-chat`
3. Install dependencies: `npm install`

## Configuration

1. Create a `.env` file in the project root directory.
2. Add the following environment variables to the `.env` file:

   MONGODB_URI=mongodb+srv://your-connection-string-here
   JWT_SECRET=your-secret-key-here

3. Replace `your-connection-string-here` with your MongoDB connection string.
4. Replace `your-secret-key-here` with a secret key for signing JSON Web Tokens.

## Running the Application

1. Start the server: `node server.js`
2. Open a web browser and navigate to `http://localhost:3000/register.html` to access the registration page.

## Testing Real-time Chat

1. Open two or more browser windows or tabs and navigate to the login page of your application (`http://localhost:3000/login.html`).
2. Log in with different user accounts in each window or tab.
3. After logging in, you should be redirected to the chat page where you can see a list of messages and a form to send new messages.
4. In one of the windows or tabs, type a message and click the send button.
5. The message should appear in the chat list in all windows or tabs in real-time.




   

