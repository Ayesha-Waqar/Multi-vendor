const path = require("path")

//config
if(process.env.NODE_ENV!== "production"){
   require("dotenv").config({ path: "./src/config/.env" });
}
const { connectCloudinary } = require("./config/cloudinary")
connectCloudinary()


const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const userController = require("./controllers/userController")
const errorMiddleware = require("./middlewares/error");
const userRouter = require("./controllers/userController")
const cors = require("cors")


const app= express()
app.use(express.json(
    {limit:"50mb"}
))
app.use(cookieParser())
app.use(bodyParser.urlencoded( {extended:true , limit:"50mb"}))
app.use("/" , express.static("uploads"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));




//api test path
app.get("/" , (req,res)=>{
    res.send("server is running")
})





//import paths
app.use("/api/v2/user" , userRouter)



//error handling
app.use(errorMiddleware);



module.exports=app