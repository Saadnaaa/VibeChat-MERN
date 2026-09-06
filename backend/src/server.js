import dns from "dns";
import express from "express";
import cookiePasrser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./config/db.js";
import messageRouter from "./routes/message.routes.js";
import { app, httpServer } from "./lib/socket.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookiePasrser());
app.use(express.urlencoded({ extended: true }));

// CORS only needed in development (in prod, same origin serves both)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is up and running" });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDist));

  // All non-API routes serve index.html (for React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is up and running 🎉 on port ${PORT}`);
  });
});
