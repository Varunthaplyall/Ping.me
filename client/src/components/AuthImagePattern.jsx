import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden h-screen lg:flex items-center justify-center bg-gradient-to-br from-purple-900 to-black p-12 overflow-hidden">
      <div className="max-w-md text-center relative z-10">
        {/* Hexagon Grid Pattern */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`
                relative aspect-square
                before:content-[''] before:absolute before:inset-0
                before:bg-gradient-to-br before:from-purple-500 before:to-purple-600 before:rounded-lg
                before:transform before:rotate-45
                animate-pulse
                hover:scale-105 hover:before:bg-purple-700 transition-all duration-300
              `}
            >
              <div
                className={`
                  absolute inset-1
                  bg-gradient-to-br from-purple-500/5 to-transparent
                  rounded-lg transform rotate-45
                `}
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="relative">
          <h2 className="text-3xl font-bold mb-4 text-white relative text-shadow">
            {title}
          </h2>
          <p className="text-lg text-purple-300/80 relative leading-tight">
            {subtitle}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl animate-pulse delay-200" />
      </div>
    </div>
  );
};

export default AuthImagePattern;
