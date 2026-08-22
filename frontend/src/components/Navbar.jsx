import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import VibeChat from "../svgs/VibeChat";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100/90 border-b border-base-300 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between">
        {/* LOGO & BRAND */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity group my-auto"
        >
          <VibeChat className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:scale-105 transition-transform duration-200 shrink-0" />

          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-base-content flex items-center leading-none">
            Vibe
            <span className="text-primary ml-0.5">Chat</span>
          </h1>
        </Link>

        {/* NAVIGATION ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Settings Link */}
          <Link
            to="/settings"
            title="Settings"
            className="btn btn-ghost btn-sm gap-2 text-base-content/80 hover:text-base-content"
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {/* User Auth Actions */}
          {authUser && (
            <>
              {/* Profile Link */}
              <Link
                to="/profile"
                title="Profile"
                className="btn btn-ghost btn-sm gap-2 text-base-content/80 hover:text-base-content"
              >
                <User className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Logout"
                className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/10"
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
