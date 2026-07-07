const app = require("./src/app");
const connectDb = require("./src/db/Db");

let server;

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({
        path: "./src/config/.env",
    });
// console.log(process.env.MONGOOSE_URI);
}
 
const PORT = process.env.PORT || 3000;

// Start server
async function startServer() {
    try {
        await connectDb();

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            
        });
    } catch (err) { 
      console.log("server not running");
        process.exit(1);
    }
}

startServer();

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled promise rejection");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});