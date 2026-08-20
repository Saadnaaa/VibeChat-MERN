import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/get-me", protectRoute, getMe);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectRoute, updateProfile);

export default authRouter;
