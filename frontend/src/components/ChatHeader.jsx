import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 sm:p-4 border-b border-base-300 bg-base-100/50 backdrop-blur-sm flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring-2 ring-base-300">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullname}
              className="object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-base-content leading-tight">
            {selectedUser.fullname}
          </h3>
          <p className="text-xs text-base-content/60">
            {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <div>
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
