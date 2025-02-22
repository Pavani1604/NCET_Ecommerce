import React, { useState, useEffect } from "react";
import { fetchProducts, addToCart, fetchCart,placeOrder  } from "../services/api";
import { Card, CardContent, Typography, Grid, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../style/UserDashboard.css";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
      setShowProducts(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const loadCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const response = await fetchCart(user._id);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Place Order Functionality
  const handlePlaceOrder = async (selectedProduct) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const orderData = {
        user: user._id,
        products: [{ product: selectedProduct._id, quantity: 1 }],
        totalPrice: selectedProduct.price,
      };

      const response = await placeOrder(orderData);
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Error placing order.");
    }
  };
  const handleAddToCart = async (selectedProduct) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }
  
    try {
      await addToCart({
        user: user._id,
        product: {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          imageUrl: selectedProduct.imageUrl,  // ✅ Include image
          description: selectedProduct.description, // ✅ Include description
        },
        quantity: 1,
      });
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };
  

  // ✅ Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="user-dashboard">
      <nav className="admin-navbar">
        <button onClick={loadProducts}>View Products</button>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(event) => {
              const searchValue = event.target.value.toLowerCase();
              setSearchTerm(searchValue);
              const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchValue)
              );
              setFilteredProducts(filtered);
            }}
          />
        </div>

        <button onClick={() => navigate("/cart")}>My Cart ({cartItems.length})</button>
        
        {/* ✅ Logout Button */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>

      {showProducts && (
        <Container className="dashboard-container">
          <Typography variant="h4">Available Products</Typography>

          {filteredProducts.length === 0 ? (
            <Typography>No matching products found.</Typography>
          ) : (
            <Grid container spacing={2} className="product-grid">
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card className="product-card">
                    <CardContent>
                    <img
  src={product.imageUrl || "https://via.placeholder.com/200"} 
  alt={product.name}
  className="product-image"
/>

                      <Typography variant="h6">{product.name}</Typography>
                      <Typography>${product.price}</Typography>
                      <Typography>{product.description}</Typography>
                      <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handlePlaceOrder(product)}
                      >
                        Place Order
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </div>
  );
};

export default UserDashboard;