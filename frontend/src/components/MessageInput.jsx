import React, { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgPreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imgPreview,
      });
      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };

  return (
    <div className="p-2 sm:p-4 w-full bg-base-100/50 backdrop-blur-sm border-t border-base-300 shrink-0">
      {/* Image Preview Overlay */}
      {imgPreview && (
        <div className="mb-2 sm:mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt="preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-base-300 shadow-md"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center text-base-content hover:bg-base-content hover:text-base-100 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input & Actions Form */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-1.5 sm:gap-2"
      >
        <div className="flex-1 flex items-center gap-1.5 sm:gap-2 min-w-0">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md text-xs sm:text-sm focus:outline-none min-w-0"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image Upload Trigger Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`btn btn-circle btn-ghost btn-sm sm:btn-md shrink-0 ${
              imgPreview
                ? "text-emerald-500"
                : "text-base-content/50 hover:text-base-content"
            }`}
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imgPreview}
          className="btn btn-primary btn-sm sm:btn-md btn-circle shrink-0"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
