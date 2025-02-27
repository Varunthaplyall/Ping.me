import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function getReciverSocketId(userId) {
  return users[userId];
}

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

export { io, app, server };
