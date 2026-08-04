const express = require("express");
const shopRouter= express.Router()
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors= require("../middlewares/catchAsyncError")

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../config/cloudinary");
const shopModel = require("../model/shopModel");
const Shop= require("../model/shopModel")
const {isAuthenticated} = require("../middlewares/auth")

module.exports=shopRouter;