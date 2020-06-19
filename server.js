const path = require("path");
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

// Server static assets (build folder of client)
if (process.env.NODE_ENV === production) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`.green);
});
