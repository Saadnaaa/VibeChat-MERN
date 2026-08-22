import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import VibeChat from "../svgs/VibeChat.jsx";
import { FiMail, FiLock, FiArrowRight, FiLoader } from "react-icons/fi";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { isLoggingIn, login } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Box */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-box bg-base-100 border border-base-300 shadow-2xl overflow-hidden">
        {/* LEFT SECTION - FORM */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
          {/* Header */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">
              Welcome Back
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Sign in to your account to continue chatting.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/70 mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-base-content/50 text-lg pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full pl-10 text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/70 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-base-content/50 text-lg pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full pl-10 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary w-full mt-2 gap-2"
            >
              {isLoggingIn ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION - HERO DECORATION */}
        <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-primary text-primary-content border-t lg:border-t-0 lg:border-l border-base-300 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Welcome Back to <br className="hidden sm:inline" />
              <span className="text-secondary">Conversations.</span>
            </h2>
            <p className="opacity-80 mt-3 text-sm max-w-sm mx-auto lg:mx-0">
              Pick up right where you left off and connect with your community.
            </p>
          </div>

          {/* Hero Branding Illustration Area */}
          <div className="relative z-10 flex flex-col items-center justify-center my-8 lg:my-auto py-6 lg:py-12">
            <div className="p-6 sm:p-8 rounded-box bg-base-100/15 border border-primary-content/20 shadow-2xl animate-pulse">
              <VibeChat className="w-16 h-16 sm:w-24 sm:h-24 text-secondary" />
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 text-xs opacity-70 text-center lg:text-left">
            VibeChat App &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
