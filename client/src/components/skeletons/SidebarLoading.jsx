import React from "react";

const SidebarLoading = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-300"></div>
          <div className="w-24 h-4 rounded bg-base-300 hidden lg:block"></div>
        </div>

        {/* Filter Toggle Skeleton */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-base-300"></div>
          <div className="w-28 h-3 rounded bg-base-300"></div>
          <div className="w-8 h-3 rounded bg-base-300"></div>
        </div>
      </div>

      {/* User List Skeleton */}
      <div className="overflow-y-auto w-full py-3 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full p-3 flex items-center gap-3 rounded-md bg-base-100 hover:bg-base-200 transition-colors"
          >
            {/* Profile Picture Skeleton */}
            <div className="w-12 h-12 rounded-full bg-base-300"></div>

            {/* User Info Skeleton */}
            <div className="hidden lg:block flex-1 space-y-2">
              <div className="w-2/3 h-4 rounded bg-base-300"></div>
              <div className="w-1/3 h-3 rounded bg-base-300"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarLoading;
