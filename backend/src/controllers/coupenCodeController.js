const express = require("express")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler");
const Coupens = require ("../model/coupenCode")
const Shop = require ("../model/shopModel")


const coupenCodeRouter = express.Router()

//create coupen code 
coupenCodeRouter.post("/create-code" ,catchAsyncErrors(async (req, res, next) => {
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
    catch (error) {1
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
}))


module.exports=coupenCodeRouter