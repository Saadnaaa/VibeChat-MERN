import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import VibeChat from "../svgs/VibeChat.jsx";
import { FiUser, FiMail, FiLock, FiArrowRight, FiLoader } from "react-icons/fi";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { isSigningup, signup } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e5e5e5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Box */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* LEFT SECTION - FORM */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
          {/* Header */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Create Account
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Join VibeChat and start connecting today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212]/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212]/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121212]/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningup}
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group text-sm cursor-pointer"
            >
              {isSigningup ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Sign Up</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION - HERO DECORATION */}
        <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#121212]/90 via-slate-800 to-indigo-950/40 border-t lg:border-t-0 lg:border-l border-slate-700/40 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Start Having <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
                Conversations.
              </span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm max-w-sm mx-auto lg:mx-0">
              Connect with friends, share moments, and stay in the loop
              effortlessly.
            </p>
          </div>

          {/* Hero Branding Illustration Area */}
          <div className="relative z-10 flex flex-col items-center justify-center my-8 lg:my-auto py-6 lg:py-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-md shadow-2xl animate-pulse">
              <VibeChat className="w-16 h-16 sm:w-24 sm:h-24 text-indigo-400" />
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 text-xs text-slate-500 text-center lg:text-left">
            VibeChat App &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
