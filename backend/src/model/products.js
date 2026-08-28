const mongoose= require("mongoose")


const productSchema= new mongoose.Schema({
    name : {
        type : String , 
        required:[true , "Please enter your product name"]
    },
    description : {
        type : String , 
        required:[true , "Please enter your product description"]
    },
    category :{
        type : String , 
        required:[true , "Please enter your product category"]
    },
    tags : {
         type : String ,
    },
    originalPrice : {
        type : Number
    },
    discountPrice :{
         type : Number,
          required:[true , "Please enter your product discounted price "] 
    },
    stock :{
        type : Number,
          required:[true , "Please enter your product stock "] 
    },
    images : [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    shopId:{
        type:String , 
        required:true
    },
    shop:{
        type:Object,
        required:true
    },
    sold_out:{
         type : Number,
         default : 0,
    },
    createdAt : {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product" , productSchema)