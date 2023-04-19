import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Box } from '@mui/material';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    quantity: '',
    images: [{ url: '' }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/product', product);
      console.log('Product added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "images") {
      setProduct({
        ...product,
        images: [{ url: value }],
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <div className="container">
        <div className="sidebar">
          <div className="logo">
                <h1>AyurMart</h1>
          </div>
          <div className="menu">
            <Link to="/seller-dashboard">Seller Dashboard</Link>
            <Link to="/addProduct">Add Product</Link>
            <Link to="/profile">Profile</Link>
          </div>
          </div>
            <div className="content">
              <Box sx={{ overflowX: "hidden", marginTop: "96px", marginLeft: "400px", marginRight: "300px" }}>
              <h1 align='center'>Add Product</h1>
              <form onSubmit={handleSubmit}>
                  <label>
                    Title:
                    <input type="text" name="title" value={product.title} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Description:
                    <textarea name="description" value={product.description} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Category:
                    <input type="text" name="category" value={product.category} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Brand:
                    <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Quantity:
                    <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    Image URL:
                    <input type="text" name="images" value={product.images[0]?.url} onChange={handleChange} required />
                  </label>
                  <br />
                  <Box sx={{ marginLeft: "200px", marginRight: "300px" }}>
                    <button type="submit">Add Product</button>
                  </Box>
                </form>
              </Box>
            </div>
          </div>
    </Box>
  );
};

export default AddProductForm;
