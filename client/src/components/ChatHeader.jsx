import React from "react";
import { useChatStore } from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-base-300 shadow-sm">
              <img
                src={selectedUser.profilePicture || "/avatar.png"}
                alt={selectedUser.userName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User Details */}
          <div className="text-left">
            <h3 className="font-semibold text-base-content text-lg truncate">
              {selectedUser.userName}
            </h3>
            <p
              className={`text-sm ${
                onlineUsers.includes(selectedUser._id)
                  ? "text-green-500"
                  : "text-base-content/70"
              }`}
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-300 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-base-content" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
