import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/get-me");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to create your account",
      );
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to login",
      );
      console.log("Error in login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      toast.success("Logged out successfully");
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
      console.log("Error in logout", error);
    }
  },
}));
