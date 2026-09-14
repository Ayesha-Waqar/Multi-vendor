const express = require("express")
const catchAsyncErrors = require("../middlewares/catchAsyncError")
const { cloudinary } = require("../config/cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middlewares/auth");
const Shop = require("../model/shopModel")
const Event = require("../model/event")

const eventRouter = express.Router()

//create events
eventRouter.post("/create-event", catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid", 400))
        }

        let images = req.body.images

        if (!images) {
            return next(new ErrorHandler("Please upload at least one image", 400))
        }

        if (typeof images === "string") {
            images = [images]
        }

        const imagesLinks = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image, {
                    folder: "images",
                })
                return {
                    public_id: result.public_id,
                    url: result.secure_url,
                }
            })
        )

        const eventData = req.body
        eventData.images = imagesLinks
        eventData.shop = shop

        const event = await Event.create(eventData)

        res.status(201).json({
            success: true,
            event,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


//get all events 
eventRouter.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop events (specific shop ka )
eventRouter.get("/get-all-shop-events/:id" , catchAsyncErrors(async(req,res,next)=>{
    try{
        const shopId= req.params.id
        const events = await Event.find({shopId})
        res.status(200).json({
            success : true ,
            events
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

}))

//delete any event
eventRouter.get("/delete-shop-event/:id" , isSeller ,catchAsyncErrors(async(req,res,next)=>{
    try{
        const eventId= req.params.id

        const event = await Event.findByIdAndDelete(eventId)

        if(!event){
            return next (new ErrorHandler("event not found ", 400))
        }

         // Delete event images from Cloudinary
              if (event.images && event.images.length > 0) {
                for (const image of event.images) {
                  if (image.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                  }
                }
              }
        

        res.status(200).json({
            success : true ,
            message : "Event deleted sucessfully"
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

}))

module.exports = eventRouter