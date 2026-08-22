import React from "react";
import VibeChat from "../svgs/VibeChat";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-base-100/50 backdrop-blur-sm">
      <div className="max-w-md text-center flex flex-col items-center justify-center space-y-6">
        {/* Animated Brand Logo Container */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />
          <div className="relative p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-300 shadow-2xl transition-transform duration-300 hover:scale-105">
            <VibeChat className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-bounce" />
          </div>
        </div>

        {/* Text Header & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              VibeChat
            </span>
          </h1>
          <p className="text-sm sm:text-base text-base-content/60 leading-relaxed">
            Select a conversation from the sidebar to start messaging and
            sharing vibes.
          </p>
        </div>

        {/* Action Hint Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-xs font-medium text-base-content/70 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Ready to connect
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
