const express = require("express")
const mongoose = require("mongoose")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler");
const Coupens = require("../model/coupenCode")
const Shop = require("../model/shopModel")
const { isSeller } = require("../middlewares/auth");

const coupenCodeRouter = express.Router()

//create coupen code 
coupenCodeRouter.post("/create-code", catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 400))
        }


        const codeData = req.body
        codeData.shop = shop

        const coupenCode = await Coupens.create(codeData)

        res.status(201).json({
            success: true,
            coupenCode,
        })
    }
    catch (error) {
        1
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
}))
//get shop coupen codes 
coupenCodeRouter.get("/get-all-shop-coupens/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.params.id
        console.log(shopId)
        const coupens = await Coupens.find({ "shop._id": new mongoose.Types.ObjectId(shopId) })
         console.log("Coupens found:", coupens.length);

        res.status(200).json({
            success: true,
            coupens
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

//delete any coupen 
coupenCodeRouter.get("/delete-shop-coupen/:id" , isSeller ,catchAsyncErrors(async(req,res,next)=>{
    try{
        const coupenId= req.params.id

        const coupen = await Coupens.findByIdAndDelete(coupenId)

        if(!coupen){
            return next (new ErrorHandler("coupen not found ", 400))
        }

        res.status(200).json({
            success : true ,
            message : "coupen deleted sucessfully"
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

}))

module.exports = coupenCodeRouter