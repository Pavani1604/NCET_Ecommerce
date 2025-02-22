import React, { useState } from "react";
import { createProduct } from "../services/api";

const ProductForm = ({ token }) => {
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", stock: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product, token);
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
        <input type="text" placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
        <input type="number" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
        <input type="text" placeholder="Category" onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
        <input type="number" placeholder="Stock" onChange={(e) => setProduct({ ...product, stock: e.target.value })} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
