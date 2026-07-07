const mongoose = require("mongoose");

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