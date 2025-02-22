const express = require("express");
const  { placeOrder, getUserOrders } = require("../controllers/orderController.js");

const router = express.Router();

// ✅ Place an Order
router.post("/place", placeOrder);

// ✅ Get Orders by User ID
router.get("/user/:userId", getUserOrders);

module.exports = router;
