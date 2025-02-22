const Cart = require("../models/cartModel");
// Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, products: [] });
    }

    // Check if product is already in cart
    const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === product);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
}
// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.cartItemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error removing item from cart" });
  }
};
exports.fetchCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("products.product");
    res.status(200).json(cart ? cart.products : []);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
}