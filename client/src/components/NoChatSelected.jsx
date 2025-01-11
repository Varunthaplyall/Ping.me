import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-12 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center
            justify-center animate-pulse"
            >
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-primary-content">
          Start a conversation
        </h2>

        {/* Description */}
        <p className="text-base-content/70 leading-relaxed">
          Start a new conversation by selecting a chat from the sidebar
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
