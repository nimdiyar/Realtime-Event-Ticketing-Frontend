const express = require("express");
const { createVendor, getVendors } = require("../controllers/VendorController");
const router = express.Router();

// Route to create the vendor
router.post("/", createVendor);

// Route to get all the vendors
router.get("/", getVendors);

module.exports = router;
