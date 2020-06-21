const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");
const auth = require("../../middlewares/auth");

// Routes Definitions

// @desc Get all items
// @route GET /api/items
// @access public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({
      date: -1,
    });
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
});

// @desc Create a new item
// @route POST /api/items
// @access private - only authenticated users
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Please enter an item name",
      });
    }
    const newItem = new Item({
      name: req.body.name,
    });
    const addedItem = await newItem.save();
    return res.status(200).json({
      success: true,
      data: addedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
});

// @desc Delete an item using its id
// @route DELETE /api/items/:id
// @access private - only authenticated users
router.delete("/:id", auth, async (req, res) => {
  try {
    const idToDelete = req.params.id;

    const itemToDelete = await Item.findById(idToDelete);

    const resp = itemToDelete.remove();

    return res.status(200).json({
      success: true,
      data: "Item deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
});

module.exports = router;
