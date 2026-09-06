import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket || !socket.connected) {
    socket = io(SOCKET_URL, {
      query: { userId },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
