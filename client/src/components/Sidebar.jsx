import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import SidebarLoading from "./skeletons/SidebarLoading";
import useAuthStore from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <div>
        <SidebarLoading />
      </div>
    );
  }
  return (
    <aside className="h-full  w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              //   checked={showOnlineOnly}
              //   onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
              aria-label="Show online users only"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({users.length > 1 ? users.length - 1 : 0} online)
          </span>
        </div> */}
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full lg:px-3 py-3">
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={` w-full p-3 flex items-center gap-3 rounded-md hover:bg-base-200 transition-colors
            ${
              selectedUser?._id === user._id
                ? "bg-primary/10 ring-1 ring-primary/50"
                : ""
            }`}
              aria-label={`Select ${user.userName}`}
            >
              {/* Profile Picture */}
              <div className="relative mx-auto lg:mx-0 ">
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.userName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100"
                    aria-label="Online"
                  />
                )}
              </div>
              {/* User Info */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.userName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-6">
            No users found in your contact list.
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
