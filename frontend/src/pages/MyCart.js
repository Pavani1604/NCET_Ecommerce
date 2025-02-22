import React, { useState, useEffect } from "react";
import { fetchCart, removeFromCart } from "../services/api";
import { Card, CardContent, Typography, Grid, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/MyCart.css"; // ✅ Import CSS file

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    try {
      const response = await fetchCart(user._id);
      const validCartItems = response.data.filter(item => item && item.product);
  
      // ✅ Remove duplicate products using a Set
      const uniqueCartItems = [];
      const seenProducts = new Set();
  
      for (const item of validCartItems) {
        if (!seenProducts.has(item.product._id)) {
          seenProducts.add(item.product._id);
          uniqueCartItems.push(item);
        }
      }
  
      setCartItems(uniqueCartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart({ product: productId });
      setCartItems(cartItems.filter((item) => item?.product?._id !== productId)); // ✅ Update UI instantly
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <Container className="cart-container">
      <Typography variant="h4" className="cart-title">My Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography className="empty-cart">No items in the cart.</Typography>
      ) : (
        <Grid container spacing={2} className="cart-grid">
        {cartItems.map((item) => (
  <Grid item xs={12} sm={6} md={4} key={item.product._id}>
    <Card className="cart-card">
      <CardContent>
        <img 
          src={item.product.imageUrl || "https://via.placeholder.com/150"} 
          alt={item.product.name} 
          className="cart-item-image"
        />
        <Typography variant="h6" className="cart-item-name">{item.product.name}</Typography>
        <Typography className="cart-item-price">${item.product.price}</Typography>
        <Typography className="cart-item-description">{item.product.description}</Typography>
        <Button
          variant="contained"
          color="secondary"
          className="remove-button"
          onClick={() => handleRemoveFromCart(item.product._id)}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  </Grid>
))}

        </Grid>
      )}

      <div className="cart-actions">
        <Button
          variant="contained"
          color="primary"
          className="back-button"
          onClick={() => navigate("/user-dashboard")}
        >
          View Products
        </Button>
      </div>
    </Container>
  );
};

export default MyCart;
