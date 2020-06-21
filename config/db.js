const mongoose = require("mongoose");

const connectToDB = async (MONGO_URI) => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error in connecting to MongoDB ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectToDB;
