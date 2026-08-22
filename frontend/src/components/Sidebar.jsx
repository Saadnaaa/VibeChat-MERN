import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100/50 backdrop-blur-sm shrink-0 transition-all duration-200">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5 shrink-0">
        <div className="flex items-center gap-2.5 justify-center lg:justify-start">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <span className="font-semibold text-base-content hidden lg:block">
            Contacts
          </span>
        </div>

        {/* TODO: ONLINE FILTER TOGGLE */}
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto w-full py-3 space-y-1">
        {users.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? "bg-base-200 border-r-4 border-primary"
                  : "hover:bg-base-200/50"
              }`}
            >
              {/* Avatar + Status Indicator */}
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-base-300">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullname}
                      className="object-cover"
                    />
                  </div>
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-base-100" />
                )}
              </div>

              {/* User Info (Visible on Large Screens) */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium text-sm text-base-content truncate">
                  {user.fullname}
                </div>
                <div className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOnline ? "bg-success" : "bg-base-content/30"
                    }`}
                  />
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {users.length === 0 && (
          <div className="text-center text-base-content/50 py-8 text-sm hidden lg:block">
            No contacts available
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
