const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email!"],
    unique: true,

  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false, // MUST be false
  },
  phoneNumber: {
    type: Number,
    required:true
  },
  address: {
    type:String,
    required:true
  },
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
    },
  },
  zipCode:{
    type: Number,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Shop", shopSchema);