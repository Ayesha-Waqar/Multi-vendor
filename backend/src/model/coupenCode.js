const mongoose= require("mongoose")


const coupenCodeSchema= new mongoose.Schema({
    name : {
        type : String , 
        required:[true , "Please enter your event product name"],
        unique : true ,
    },
    value : {
        type : Number , 
        required : true ,

    },
    shop:{
        type:Object,
        required:true
    },
    createdAt : {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Coupens" , coupenCodeSchema)