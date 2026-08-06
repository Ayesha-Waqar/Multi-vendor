const mongoose = require("mongoose");

const pendingShopSchema = new mongoose.Schema(
  {
    name: {
      type : String ,
      required : true ,
    },
    email: {
      type: String,
      unique: true,
      required : true ,
    },
    password: String,
    phoneNumber : {
      type : Number ,
      required : true ,
    },
    address : {
      type : String ,
      required : true ,
    },
    zipCode:{
      type : Number ,
      required : true ,
    },
    avatar: String,
    activationToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendingShop", pendingShopSchema);
