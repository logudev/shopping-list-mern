const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");

const connectToDB = require("./config/db");
const itemRoute = require("./routes/api/items");

// Initializing express server
const app = express();

// Initializing body parser
app.use(express.json());

connectToDB();

app.use("/api/items", itemRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`.green);
});
