import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      set({ authUser: response.data.user });
    } catch (error) {
      // console.log("Error checking auth");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      if (response.status === 201) {
        toast.success("Account created successfully");
        localStorage.setItem("token", response.data.token);
        set({ authUser: response.data });
        get().connectSocket();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.log("Error signing up", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response.status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", response.data.token);
        set({ authUser: response.data });
        get().connectSocket();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.log("Error logging in", error.response.data.message);
      toast.error(error.response.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: () => {
    try {
      localStorage.removeItem("token");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      // console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", {
        profilePic: data,
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        set({ authUser: response.data.user });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.log("Error updating profile", error);
      toast.error("Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    set({ socket: null });
  },
}));

export default useAuthStore;
