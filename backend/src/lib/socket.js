import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Maps userId → socketId for targeting specific users
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[String(userId)];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Client sends their userId as a query param on connect
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    // Broadcast updated online users list to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
