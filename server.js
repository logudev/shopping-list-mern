const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const config = require("config");

const connectToDB = require("./config/db");

// Initializing express server
const app = express();

// Initializing body parser
app.use(express.json());

// Getting MONGO_URI from config
const MONGO_URI = config.get("MONGO_URI");
connectToDB(MONGO_URI);

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Server static assets (build folder of client)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`.green);
});
