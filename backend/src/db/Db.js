const mongoose = require("mongoose");
const dns = require("dns");

// DNS servers set karo BEFORE MongoDB connection
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignored in restricted environments
}

const connectDb = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGOOSE_URI);

    console.log(`MongoDB Connected: ${data.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;