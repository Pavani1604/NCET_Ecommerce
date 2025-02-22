const Order = require("../models/orderModel");

// ✅ Create Order
exports.placeOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;
    
    if (!user || !products || products.length === 0 || !totalPrice) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({ user, products, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Orders by User
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
