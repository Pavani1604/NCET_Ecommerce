import React, { useState, useEffect } from "react";
import { createProduct, fetchProducts, deleteProduct, updateProduct } from "../services/api";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ 
    name: "", price: "", description: "", category: "", stock: "", imageUrl: "" 
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct(formData);
      alert("Product added successfully!");
      setProducts([...products, response.data]);
      setFormData({ name: "", price: "", description: "", category: "", stock: "", imageUrl: "" });
      setActiveSection("availableProducts");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      alert("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      imageUrl: product.imageUrl
    });
    setActiveSection("editProduct");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await updateProduct(editingProduct._id, formData);
      alert("Product updated successfully!");
      
      setProducts(products.map((p) => (p._id === editingProduct._id ? response.data : p)));

      setEditingProduct(null);
      setFormData({ name: "", price: "", description: "", category: "", stock: "", imageUrl: "" });
      setActiveSection("availableProducts");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className={`admin-dashboard ${activeSection === "home" ? "home-background" : ""}`}>
      <nav className="admin-navbar">
        <button onClick={() => setActiveSection("home")}>Home</button>
        <button onClick={() => setActiveSection("addProduct")}>Add Product</button>
        <button onClick={() => setActiveSection("availableProducts")}>Available Products</button>
        <button onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}>Logout</button>
      </nav>

      {activeSection === "addProduct" && (
        <div>
          <h3>Add Product</h3>
          <form className="product-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}

      {activeSection === "availableProducts" && (
        <div>
          <h3>Available Products</h3>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card className="product-card">
                  <CardContent>
                    <a href={product.imageUrl} target="_blank" rel="noopener noreferrer" className="product-link">View Image</a>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography className="product-price">${product.price}</Typography>
                    <Typography className="product-description">{product.description}</Typography>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(product)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {activeSection === "editProduct" && editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <form className="product-form" onSubmit={handleUpdate}>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setActiveSection("availableProducts")}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
