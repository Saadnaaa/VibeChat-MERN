import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import VibeChat from "../svgs/VibeChat";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212]/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between">
        {/* LOGO & BRAND */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity group my-auto"
        >
          <VibeChat className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400 group-hover:scale-105 transition-transform duration-200 shrink-0" />

          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#e5e5e5] flex items-center leading-none">
            Vibe
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 ml-0.5">
              Chat
            </span>
          </h1>
        </Link>

        {/* NAVIGATION ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Settings Link */}
          <Link
            to="/settings"
            title="Settings"
            className="flex items-center justify-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-medium text-[#e5e5e5]/80 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all duration-200"
          >
            <Settings className="w-4 h-4 text-[#e5e5e5]/60 shrink-0" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {/* User Auth Actions */}
          {authUser && (
            <>
              {/* Profile Link */}
              <Link
                to="/profile"
                title="Profile"
                className="flex items-center justify-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-medium text-[#e5e5e5]/80 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all duration-200"
              >
                <User className="w-4 h-4 text-[#e5e5e5]/60 shrink-0" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Logout"
                className="flex items-center justify-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
