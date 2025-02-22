const express = require("express");
const { getAllProducts, createProduct, deleteProduct,updateProduct} = require("../controllers/productController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-products", getAllProducts);
router.post("/create-products", createProduct); // Only admin can add
router.delete("/delete-products/:id", deleteProduct); // Only admin can delete
//router.get("/product/:id", getProductById);
router.put("/products/:id", updateProduct);

module.exports = router;
