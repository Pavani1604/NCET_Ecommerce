import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// Attach Token to Requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User Authentication APIs
export const registerUser = (formData) => API.post("/register", formData);
export const loginUser = (formData) => API.post("/login", formData);

// Product APIs
export const fetchProducts = () => API.get("/get-products");
export const createProduct = (formData) => API.post("/create-products", formData);
export const deleteProduct = (productId) => API.delete(`/delete-products/${productId}`);
export const addToCart = (data) => API.post("/add", data);

export const updateProduct = (productId, formData) => API.put(`/products/${productId}`, formData);  // Update product

// export const fetchCart = (userId) => API.get(`/${userId}`);
export const fetchCart = (userId) => API.get(`/cart/${userId}`);

export const removeFromCart = (data) => API.post("/remove", data);// ✅ Order APIs
export const placeOrder = (orderData) => API.post("/place", orderData);
export const fetchOrders = (userId) => API.get(`/user/${userId}`);
