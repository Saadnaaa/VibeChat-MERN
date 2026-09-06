import dns from "dns";
import express from "express";
import cookiePasrser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookiePasrser());
app.use(express.urlencoded({ extended: true }));
// Implemented CORS to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is up and running" });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is up and running 🎉 on port ${PORT}`);
  });
});
