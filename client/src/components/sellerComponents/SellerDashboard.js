import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography, Rating, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { useProductsContext } from '../../hooks/useProductsContext';
import { useSellerLogout } from '../../hooks/useSellerLogout'
import { useSellerAuthContext } from '../../hooks/useSellerAuthContext';

const SellerDashboard = () => {

    const { products, dispatch } = useProductsContext()
    const { seller } = useSellerAuthContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:7004/api/seller')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
    }, [dispatch]);

    const handleDelete = async (productId) => {
        const response = await fetch('http://localhost:7005/api/product/' + productId, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }

    const { sellerlogout } = useSellerLogout()

    const handleClick = () => {
        sellerlogout()
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <div className="container">
            <div className="sidebar">
                <div className="logo">
                <h1>AyurMart</h1>
                </div>
                <div className="menu">
                <Link to="/seller-dashboard">Seller Dashboard</Link>
                <Link to="/addProduct">Add Product</Link>
                {!seller && (
                    <div>
                        <Link to="/sellerLogin">Login</Link>
                        <Link to="/sellerSignup">Signup</Link>
                    </div>
                )}
                {seller && (
                    <div>
                        <Button onClick={handleClick}>Log Out</Button>
                        <span>{seller.email}</span>
                        </div>
                )}
                </div>
            </div>
            <div className="content">
            <Box sx={{ overflowX: "hidden", marginTop: "96px", marginLeft: "200px" }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>Product</TableCell>
                            <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Ratings</TableCell>
                            <TableCell style={{ fontSize: '18px', fontWeight: 'bold' }}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                        {product.images && product.images.length > 0 && (
                                            <Card sx={{
                                                display: "flex",
                                                py: 2,
                                                flexDirection: "column",
                                                height: "100%",
                                                maxWidth: "250px",
                                                transition: "transform 0.2s ease-in-out",
                                                "&:hover": {
                                                    transform: "scale(1.02)",
                                                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                                }
                                            }}>
                                                <CardMedia component="img" height="auto" image={product.images[0].url} alt={product.title} sx={{ pb: 1, width: '30%', margin: "0 auto" }} />
    
    
                                                <CardContent sx={{ flex: 1 , margin: "0 auto"}}>
                                                    <Box>
                                                        <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }} >
                                                            {product.title}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Link>
                                </TableCell>
                                <TableCell>Rs.{product.price}.00</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Rating name="totalrating" value={product.totalrating} readOnly />
                                        <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                            ({product.ratings.length} ratings)
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" color="textSecondary" paragraph={true}>
                                        {product.description}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button style={{ backgroundColor: '#BE2308', color: 'white' }} onClick={() => handleDelete(product._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </div>
    </div>
    </Box>
    )  
}

export default SellerDashboard;

