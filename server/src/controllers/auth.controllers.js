const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const createToken = require("../utils/createToken");
const cloudinary = require("../controllers/cloudnary");

const authController = {
  register: async (req, res) => {
    const { userName, email, password } = req.body;

    try {
      if (!userName || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res.status(409).json({ message: "Email already exist" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = await userModel.create({
        userName,
        email,
        password: hashedPassword,
      });

      const token = createToken({
        id: createUser._id,
      });

      return res.status(201).json({
        success: true,
        message: "user created sucessfully",
        id: createUser._id,
        email: createUser.email,
        userName: createUser.userName,
        profilePic: createUser.profilePic,
        token: token,
      });
    } catch (error) {
      console.log("Error ocurred while creating user :", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const token = createToken({
        id: user._id,
      });

      return res.status(200).json({
        success: true,
        message: "user logged in sucessfully",
        userName: user.userName,
        email: user.email,
        id: user._id,
        profilePic: user.profilePicture,
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
      console.log("Error ocurred while logging in :", error);
    }
  },

  updateProfile: async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user.id;
    try {
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }

      const result = await cloudinary.uploader.upload(profilePic);
      const secureUrl = result.secure_url;
      console.log(secureUrl);
      const user = await userModel
        .findByIdAndUpdate(
          userId,
          {
            profilePicture: secureUrl,
          },
          { new: true }
        )
        .select("-password");

      console.log(user);

      res.status(200).json({ user });
    } catch (error) {
      console.log("Error ocurred while updating profile pic :", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  verify: async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id).select("-password");
      res.status(200).json({ message: "user verified", user: user });
    } catch (error) {
      console.log("Error ocurred while verifying user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
