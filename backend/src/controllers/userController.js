const express = require("express");
const userRouter = express.Router();

const User = require("../model/userModel");
const PendingUser = require("../model/pendingUserModel");

const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../config/cloudinary");

// ================= REGISTER =================

userRouter.post("/create-user", async (req, res, next) => { 
  // console.log("Create user route hit");
  // console.log(req.body);
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password || !avatar) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorHandler("User already exists", 400));
    }

    await PendingUser.deleteOne({ email });

    

    const pendingUser = await PendingUser.create({
      name,
      email,
      password: password,
      avatar,
    });

    const activationToken = jwt.sign(
      {
        id: pendingUser._id,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    pendingUser.activationToken = activationToken;
    await pendingUser.save();

    const activationUrl =
`${process.env.FRONTEND_URL}/activation/${activationToken}`;

    await sendMail({
      email,
      subject: "Activate Your Account",
      text: `Click the link below to activate your account.

${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: "Please check your email to activate your account.",
    });

  }  catch (error) {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: error.message,
  });
}
});

// ================= ACTIVATE ACCOUNT =================

userRouter.post("/activation/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    // Verify JWT
    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);

    // Find pending user
    const pendingUser = await PendingUser.findById(decoded.id);

    if (!pendingUser) {
      return next(new ErrorHandler("Activation link is invalid or expired", 400));
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: pendingUser.email });

    if (userExists) {
      await PendingUser.findByIdAndDelete(pendingUser._id);

      return next(new ErrorHandler("User already exists", 400));
    }

    // Upload avatar to Cloudinary
    const uploadedAvatar = await cloudinary.uploader.upload(
      pendingUser.avatar,
      {
        folder: "avatars",
      }
    );

    // Create real user
    const createdUser = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      avatar: {
        public_id: uploadedAvatar.public_id,
        url: uploadedAvatar.secure_url,
      },
    });

    // Delete pending user
    await PendingUser.findByIdAndDelete(pendingUser._id);

    // Login user
    sendToken(createdUser, 201, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// ================= TOKEN =================

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = userRouter;