import React, { useState } from "react";
import { User, Mail, Camera } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      updateProfile(base64Image);
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-black">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 space-y-8 border border-purple-500/20 shadow-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">Profile</h1>
            <p className="mt-2 text-purple-300/60">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePicture || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-purple-500/20"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-purple-600 hover:bg-purple-500 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="size-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-purple-300/60">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-purple-300/60 flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-purple-500/20 text-white">
                {authUser?.userName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-purple-300/60 flex items-center gap-2">
                <Mail className="size-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-purple-500/20 text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-gray-800/50 rounded-xl p-6 border border-purple-500/10">
            <h2 className="text-lg font-medium text-white mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-purple-500/10">
                <span className="text-purple-300/60">Member Since</span>
                <span className="text-white">
                  {authUser?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-purple-300/60">Account Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
