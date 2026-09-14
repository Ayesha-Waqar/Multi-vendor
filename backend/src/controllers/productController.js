const express = require("express")
const productRouter = express.Router()
const Product = require("../model/products")
const ErrorHandler = require("../utils/ErrorHandler");
const { cloudinary } = require("../config/cloudinary");
const { isSeller } = require("../middlewares/auth");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const Shop = require("../model/shopModel")

// create products 
productRouter.post("/create-product", catchAsyncErrors(async (req, res, next) => {
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

        const productData = req.body
        productData.images = imagesLinks
        productData.shop = shop

        const product = await Product.create(productData)

        res.status(201).json({
            success: true,
            product,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

//get all products 
productRouter.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop products  (specific shop)
productRouter.get("/get-all-shop-products/:id" , catchAsyncErrors(async(req,res,next)=>{
    try{
        const shopId= req.params.id
        const products = await Product.find({shopId})
        res.status(200).json({
            success : true ,
            products
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

}))

//delete any product
productRouter.get(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }

      // Delete product images from Cloudinary
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          if (image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
          }
        }
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = productRouter