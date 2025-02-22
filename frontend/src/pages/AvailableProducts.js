import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../style/AdminStyle.css';

const AvailableProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
              <CardContent>
                <div className="product-header">
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography className="product-price">${product.price}</Typography>
                </div>
                <Typography className="product-description">{product.description}</Typography>
                <div className="product-footer">
                  <span className="category">Category: {product.category}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AvailableProducts;
