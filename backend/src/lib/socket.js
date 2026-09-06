import { server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origion: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  io.on("disconnect", (socket) => {
    console.log("A user disconnected", socket.id);
  });
});
