import React, { useState } from "react";
import {
  Camera,
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e5e5e5] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Box */}
      <div className="w-full max-w-2xl rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Your Profile Information
          </p>
        </div>

        {/* Image Upload Code */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative group">
            <img
              src={selectedImage || authUser?.profilePic || "/avatar.png"}
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-700/80 shadow-xl"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all duration-200 ${
                isUpdatingProfile
                  ? "animate-pulse cursor-not-allowed"
                  : "cursor-pointer group-hover:scale-110"
              }`}
            >
              {isUpdatingProfile ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Camera className="w-5 h-5" />
              )}
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {isUpdatingProfile
              ? "Uploading....."
              : "Click on camera icon to change DP"}
          </p>
        </div>

        {/* User Info Fields */}
        <div className="space-y-4 mb-8">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Full Name
            </label>
            <div className="w-full px-4 py-3 rounded-xl bg-[#121212]/80 border border-slate-700/80 text-white text-sm font-medium">
              {authUser?.fullname}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              Email Address
            </label>
            <div className="w-full px-4 py-3 rounded-xl bg-[#121212]/80 border border-slate-700/80 text-white text-sm font-medium">
              {authUser?.email}
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="rounded-xl bg-[#121212]/50 border border-slate-700/60 p-5">
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Account Information
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-700/40">
              <span className="text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                Member Since
              </span>
              <span className="font-medium text-white">
                {authUser?.createdAt?.split("T")[0]}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400">Account Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
