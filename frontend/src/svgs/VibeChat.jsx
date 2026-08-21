import React from "react";

const VibeChat = ({ size = 128, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center justify-center p-4 rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
      >
        <defs>
          {/* Main Glow Gradient */}
          <linearGradient
            id="vibeGradient"
            x1="20"
            y1="20"
            x2="180"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#EC4899" /> {/* Pink-500 */}
            <stop offset="50%" stopColor="#A855F7" /> {/* Purple-500 */}
            <stop offset="100%" stopColor="#3B82F6" /> {/* Blue-500 */}
          </linearGradient>

          {/* Soundwave Bars Gradient */}
          <linearGradient
            id="barGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F3E8FF" />
          </linearGradient>

          {/* Soft Shadow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Chat Bubble with Tail */}
        <path
          d="M100 25C55.8172 25 20 58.5786 20 100C20 121.32 29.8058 140.508 45.6743 154.217C43.102 166.429 36.1953 176.438 28.5134 182.853C26.5414 184.499 27.8183 187.683 30.3479 187.352C49.9868 184.78 68.3093 175.766 80.2012 168.966C86.5866 170.957 93.1818 172 100 172C144.183 172 180 138.421 180 96C180 53.5786 144.183 25 100 25Z"
          fill="url(#vibeGradient)"
        />

        {/* Inner Soundwave Bars (The "Vibe") */}
        <g fill="url(#barGradient)" opacity="0.95">
          {/* Bar 1 */}
          <rect x="62" y="85" width="8" height="30" rx="4" />
          {/* Bar 2 */}
          <rect x="78" y="70" width="8" height="60" rx="4" />
          {/* Bar 3 (Center High) */}
          <rect x="96" y="55" width="8" height="90" rx="4" />
          {/* Bar 4 */}
          <rect x="114" y="70" width="8" height="60" rx="4" />
          {/* Bar 5 */}
          <rect x="130" y="85" width="8" height="30" rx="4" />
        </g>

        {/* Dynamic Pulse Ring */}
        <circle
          cx="100"
          cy="98"
          r="72"
          stroke="url(#vibeGradient)"
          strokeWidth="3"
          strokeDasharray="6 8"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default VibeChat;
