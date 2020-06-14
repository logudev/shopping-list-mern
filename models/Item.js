const mongoose = require("mongoose");

// Create Item Schema

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for the item"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ItemModel = mongoose.model("item", ItemSchema);

module.exports = ItemModel;
