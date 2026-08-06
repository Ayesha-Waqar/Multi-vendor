const express = require("express");
const shopRouter = express.Router();

const Shop = require("../model/shopModel");
const PendingShop = require("../model/pendingShopModel");

const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");

// ================= REGISTER =================

shopRouter.post("/create-shop", async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      avatar,
      phoneNumber,
      address,
      zipCode,
    } = req.body;
    // console.log(req.body)

    if (
      !name ||
      !email ||
      !password ||
      !avatar ||
      !phoneNumber ||
      !address ||
      !zipCode
    ) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }

    const shopExists = await Shop.findOne({ email });

    if (shopExists) {
      return next(new ErrorHandler("Seller already exists", 400));
    }

    // Remove any old pending registration
    await PendingShop.deleteOne({ email });

    // Create pending seller
    const pendingShop = await PendingShop.create({
      name,
      email,
      password,
      avatar,
      phoneNumber,
      address,
      zipCode,
    });

    console.log({
  phoneNumber: pendingShop.phoneNumber,
  address: pendingShop.address,
  zipCode: pendingShop.zipCode,
});
    // console.log(pendingShop)
    // Generate activation token
    const activationToken = jwt.sign(
      { id: pendingShop._id },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    pendingShop.activationToken = activationToken;
    await pendingShop.save();

    const activationUrl = `${process.env.FRONTEND_URL}/shop-activation/${activationToken}`;
    console.log("Before sendMail");
    console.log(activationUrl);


    await sendMail({
      email,
      subject: "Activate Your Seller Account",
      text: `Click the link below to activate your seller account.


${activationUrl}`,
    });
    console.log("Email sent successfully");


    res.status(201).json({
      success: true,
      message: "Please check your email to activate your seller account.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// ================= ACTIVATE ACCOUNT =================

shopRouter.post("/shop-activation/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);

    const pendingShop = await PendingShop.findById(decoded.id);

    if (!pendingShop) {
      return next(
        new ErrorHandler("Activation link is invalid or expired", 400)
      );
    }

    const shopExists = await Shop.findOne({
      email: pendingShop.email,
    });

    if (shopExists) {
      await pendingShop.deleteOne();

      return next(new ErrorHandler("Seller already exists", 400));
    }

    // Upload avatar after activation
    const uploadedAvatar = await cloudinary.uploader.upload(
      pendingShop.avatar,
      {
        folder: "avatars",
      }
    );

    const createdShop = await Shop.create({
      name: pendingShop.name,
      email: pendingShop.email,
      password: pendingShop.password,
      avatar: {
        public_id: uploadedAvatar.public_id,
        url: uploadedAvatar.secure_url,
      },
      phoneNumber: pendingShop.phoneNumber,
      address: pendingShop.address,
      zipCode: pendingShop.zipCode,
    });

    // Delete pending record
    await pendingShop.deleteOne();

    // Login seller
    sendToken(createdShop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = shopRouter;