import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
  const { signUp, isSigningUp, authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.userName) {
      return toast.error("Full name is required");
    }
    if (!formData.email) {
      return toast.error("Email is required");
    }
    if (!formData.email.includes("@")) {
      return toast.error("Email is invalid");
    }
    if (!formData.password) {
      return toast.error("Password is required");
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      signUp(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-16">
        <div className="card w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl border border-purple-500/20">
          <div className="card-body">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="avatar placeholder mb-4 animate-pulse">
                <div className="bg-purple-600 text-white rounded-full w-16 ring-2 ring-purple-400 ring-offset-2 ring-offset-black">
                  <span className="text-2xl">
                    <MessageSquare className="size-5 text-purple-300" />
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold card-title text-white justify-center mb-2">
                Create Account
              </h1>
              <p className="text-purple-300/60">Join our community today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-purple-200">
                    Full Name
                  </span>
                </label>
                <div className="join w-full">
                  <span className="join-item btn bg-purple-900 border-purple-700 hover:bg-purple-800">
                    <User className="size-5 text-purple-300" />
                  </span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input join-item w-full bg-gray-800 border-purple-700 text-white placeholder-purple-400/50 focus:outline-purple-500 focus:border-purple-500"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-purple-200">
                    Email
                  </span>
                </label>
                <div className="join w-full">
                  <span className="join-item btn bg-purple-900 border-purple-700 hover:bg-purple-800">
                    <Mail className="size-5 text-purple-300" />
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input join-item w-full bg-gray-800 border-purple-700 text-white placeholder-purple-400/50 focus:outline-purple-500 focus:border-purple-500"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-purple-200">
                    Password
                  </span>
                </label>
                <div className="join w-full">
                  <span className="join-item btn bg-purple-900 border-purple-700 hover:bg-purple-800">
                    <Lock className="size-5 text-purple-300" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input join-item w-full bg-gray-800 border-purple-700 text-white placeholder-purple-400/50 focus:outline-purple-500 focus:border-purple-500"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="join-item btn bg-purple-900 border-purple-700 hover:bg-purple-800"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-purple-300" />
                    ) : (
                      <Eye className="size-5 text-purple-300" />
                    )}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-purple-400/60">
                    Must be at least 8 characters
                  </span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-purple-600 hover:bg-purple-500 text-white border-none w-full group"
                  disabled={isSigningUp}
                >
                  <span className="flex items-center gap-2 group-hover:gap-4 transition-all">
                    {isSigningUp ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="size-5" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-300/60">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div>
        <AuthImagePattern
          title="Join the Community"
          subtitle="Join thousands of developers and creators building the future of technology."
        />
      </div>
    </div>
  );
};

export default Register;
