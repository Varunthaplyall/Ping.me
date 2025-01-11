const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const getReciverSocketId = (userId) => {
  return users[userId];
};

const users = {}; // { userId: socketId }

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) users[userId] = socket.id;

  // send the list of online users to the client
  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    // console.log("a user disconnected", socket.id);
    delete users[userId];
    // update the online users and send to the client
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

module.exports = { io, app, server, getReciverSocketId };
