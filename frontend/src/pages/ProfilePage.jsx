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
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container Box */}
      <div className="w-full max-w-2xl rounded-box bg-base-100 border border-base-300 shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">
            Profile
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Your Profile Information
          </p>
        </div>

        {/* Image Upload Code */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative group">
            <img
              src={selectedImage || authUser?.profilePic || "/avatar.png"}
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-base-300 shadow-xl"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 p-2.5 rounded-full bg-primary hover:bg-primary/80 text-primary-content shadow-lg transition-all duration-200 ${
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

          <p className="text-xs text-base-content/60 font-medium">
            {isUpdatingProfile
              ? "Uploading....."
              : "Click on camera icon to change DP"}
          </p>
        </div>

        {/* User Info Fields */}
        <div className="space-y-4 mb-8">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/70 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Full Name
            </label>
            <div className="w-full px-4 py-3 rounded-field bg-base-200 border border-base-300 text-base-content text-sm font-medium">
              {authUser?.fullname}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-base-content/70 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </label>
            <div className="w-full px-4 py-3 rounded-field bg-base-200 border border-base-300 text-base-content text-sm font-medium">
              {authUser?.email}
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="rounded-box bg-base-200 border border-base-300 p-5">
          <h2 className="text-base font-semibold text-base-content mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Account Information
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-base-300">
              <span className="text-base-content/60 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-base-content/50" />
                Member Since
              </span>
              <span className="font-medium text-base-content">
                {authUser?.createdAt?.split("T")[0]}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-base-content/60">Account Status</span>
              <span className="badge badge-success badge-outline gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
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
