import React, { useState, useRef } from "react";
import { Send, Image, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: preview,
      });
      setText("");
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;

      setPreview(imageData);
    };

    reader.onerror = () => {
      toast.error("Failed to load image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 w-full bg-base-100 border-t border-base-300">
      {/* Image Preview */}
      {preview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative w-24 h-24">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-zinc-300 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-200 hover:bg-base-300
          flex items-center justify-center transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        {/* Text Input */}
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="flex-grow input input-bordered rounded-lg input-sm sm:input-md placeholder:text-zinc-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image Upload Button */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`btn btn-circle btn-sm sm:btn-md ${
              preview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`btn btn-circle btn-sm sm:btn-md ${
            !text.trim() && !preview ? "btn-disabled" : "btn-primary"
          }`}
          disabled={!text.trim() && !preview}
          aria-label="Send message"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
