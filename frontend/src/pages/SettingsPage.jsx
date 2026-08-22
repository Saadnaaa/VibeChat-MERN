import React from "react";
import { useThemeStore } from "../store/useThemeStore.js";
import { THEMES } from "../themes/themes.js";
import { Send } from "lucide-react";

const preview_messages = [
  {
    id: 1,
    content: "Hey! How are you doing?",
    isSent: false,
    time: "12:00 PM",
  },
  {
    id: 2,
    content: "I'm doing great! Testing out the new themes right now.",
    isSent: true,
    time: "12:01 PM",
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">
            Theme
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Choose a theme to apply for your chat interface
          </p>
        </div>

        {/* THEMES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex flex-col gap-2 p-3 rounded-box border transition-all duration-200 text-left cursor-pointer ${
                theme === t
                  ? "border-primary bg-base-100 shadow-md ring-2 ring-primary/20"
                  : "border-base-300 bg-base-100/60 hover:border-base-content/20 hover:bg-base-100"
              }`}
            >
              {/* Theme Color Preview Swatch */}
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 bg-base-100 p-1 flex items-center justify-between">
                  <div className="w-2.5 h-full rounded bg-primary"></div>
                  <div className="w-2.5 h-full rounded bg-secondary"></div>
                  <div className="w-2.5 h-full rounded bg-accent"></div>
                  <div className="w-2.5 h-full rounded bg-neutral"></div>
                </div>
              </div>

              {/* Theme Name */}
              <span className="text-xs font-semibold capitalize truncate text-center w-full">
                {t}
              </span>
            </button>
          ))}
        </div>

        {/* PREVIEW MESSAGES SECTION */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-base-content">Preview</h3>

          {/* Chat Container rendering selected theme */}
          <div
            className="rounded-box border border-base-300 bg-base-100 p-4 sm:p-6 shadow-xl overflow-hidden transition-all duration-200"
            data-theme={theme}
          >
            {/* Messages Area */}
            <div className="space-y-4 py-2 min-h-[160px]">
              {preview_messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat ${msg.isSent ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble text-sm ${
                      msg.isSent
                        ? "chat-bubble-primary text-primary-content"
                        : "bg-base-200 text-base-content"
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                  <div className="chat-footer opacity-50 text-[10px] mt-1">
                    {msg.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fake Input Area */}
          <div className="pt-3 border-t border-base-300 flex items-center gap-2">
            <input
              type="text"
              readOnly
              placeholder="This is a preview..."
              className="input input-bordered input-sm w-full text-xs"
            />
            <button className="btn btn-primary btn-sm btn-square">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
