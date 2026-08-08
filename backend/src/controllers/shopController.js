const express = require("express");
const shopRouter = express.Router();

const Shop = require("../model/shopModel");
const PendingShop = require("../model/pendingShopModel");

const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/ShopToken")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../config/cloudinary");
const { isSeller } = require("../middlewares/auth");

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
      return next(new ErrorHandler("Activation link is invalid or expired", 400)
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
    sendShopToken(createdShop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// const createActivationToken = (shop) => {
//   return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
//     expiresIn: "5m",
//   });
// };

// ================= LOGIN =================
shopRouter.post(
  "/login-seller",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Enter complete credentials", 400));
    }

    const shopExists = await Shop.findOne({ email }).select("+password");

    if (!shopExists) {
      return next(new ErrorHandler("Seller does not exist", 400));
    }

    const isPassValid = await bcrypt.compare(
      password,
      shopExists.password
    );

    if (!isPassValid) {
      return next(new ErrorHandler("Please provide correct information", 400)
      );
    }

    sendShopToken(shopExists, 200, res);
  })
);

// ====================== LOAD SELLER ======================
shopRouter.get(
  "/get-seller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        seller,
        message: "Seller loaded successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//======================LOGOUT SELLER=============
shopRouter.get("/logout", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
    res.clearCookie("token", null, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    })

    res.status(200).json({
      success: true,
      message: "Logged Out"
    })
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))




module.exports = shopRouter;