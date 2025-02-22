// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // Import useParams to get the product ID from URL
// import { fetchProductById } from "../services/api"; // You'll need to create this API function
// import { Card, CardContent, Typography } from "@mui/material";

// const ProductDetail = () => {
//   const [product, setProduct] = useState(null);
//   const { productId } = useParams(); // Get the productId from the URL

//   useEffect(() => {
//     const loadProduct = async () => {
//       const response = await fetchProductById(productId); // Fetch product by ID
//       setProduct(response.data);
//     };
//     loadProduct();
//   }, [productId]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <Card>
//         <CardContent>
//           <Typography variant="h6">Price: ${product.price}</Typography>
//           <Typography>Description: {product.description}</Typography>
//           <Typography>Category: {product.category}</Typography>
//           <Typography>Stock: {product.stock}</Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProductDetail;
