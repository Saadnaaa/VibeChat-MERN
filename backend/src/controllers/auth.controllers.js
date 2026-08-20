import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../lib/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "Email already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT Token Here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        ProfilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log(`Error in Signup Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      ProfilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in login Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout Controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Delete existing image from Cloudinary if it exists
    if (user.profilePic) {
      try {
        // Extract public_id from Cloudinary URL: ".../folder/filename.jpg" -> "folder/filename"
        const publicId = user.profilePic
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (destroyError) {
        console.log(
          "Failed to delete old image from Cloudinary:",
          destroyError.message,
        );
        // Continue uploading the new image even if deletion of the old one fails
      }
    }

    // 2. Upload the new image
    const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
    });

    // 3. Update user in database
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedResponse.secure_url },
      { returnDocument: "after" },
    ).select("-password");

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(`Error in updateProfile Controller:`, error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in getMe Controller:`, error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
