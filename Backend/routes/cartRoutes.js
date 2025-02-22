const express = require("express");
const { fetchCart,addToCart, removeFromCart } = require("../controllers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", addToCart);
router.post("/remove",removeFromCart);
router.get("/cart/:userId", fetchCart);


module.exports = router;
