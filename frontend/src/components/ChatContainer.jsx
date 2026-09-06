import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const ChatContainer = () => {
  const {
    messages,
    isMessagesLoading,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col h-full bg-base-100 overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100/50 backdrop-blur-sm overflow-hidden min-w-0">
      {/* Header */}
      <ChatHeader />

      {/* Message Stream Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => {
          // Explicit string conversion handles MongoDB ObjectId mismatches
          const isMe =
            String(message.senderId) === String(authUser?._id || authUser?.id);

          return (
            <div
              key={message._id}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              {/* Profile Avatar */}
              <div className="chat-image avatar">
                <div className="w-8 sm:w-10 rounded-full ring-1 ring-base-300">
                  <img
                    src={
                      isMe
                        ? authUser?.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Message Header / Timestamp */}
              <div className="chat-header mb-1">
                <time className="text-[10px] opacity-50">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              {/* Message Bubble Content */}
              <div
                className={`chat-bubble max-w-[85%] sm:max-w-[70%] flex flex-col gap-1.5 break-words ${
                  isMe
                    ? "chat-bubble-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="max-w-full sm:max-w-[240px] max-h-60 rounded-md object-cover my-0.5"
                  />
                )}
                {message.text && (
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>

      {/* Input Field Area */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
