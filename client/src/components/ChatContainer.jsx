import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageLoading from "./skeletons/MessageLoading";
import useAuthStore from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToNewMessages,
    unsubscribeFromNewMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToNewMessages();

    return () => {
      unsubscribeFromNewMessages();
    };
  }, [getMessages, selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageLoading />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-5">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`chat ${
                message.senderId === authUser.id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="avatar size-10">
                <img
                  className="rounded-full"
                  src={
                    message.senderId === authUser.id
                      ? authUser.profilePic || "./avatar.png"
                      : selectedUser.profilePicture || "./avatar.png"
                  }
                  alt="Profile Picture"
                />
              </div>
              <div className="chat-header mb-2">
                <time className=" text-xs opacity-50 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
                <div className="chat-bubble flex flex-col gap-2">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message Image"
                      className="w-24 h-24 object-cover"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
