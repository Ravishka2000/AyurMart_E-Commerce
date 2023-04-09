import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Rating, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Product = () => {
    const productId = useParams().id;
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:7002/api/product/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.images[0].url);
            })
            .catch((err) => console.log(err));
    }, [productId]);

    const handleAddToCart = async () => {
        const cartItem = {
            id: product.id,
            quantity: quantity
        };
        try {
            const response = await axios.post('http://localhost:7002/api/user/cart', { cart: [{ _id: cartItem.id, count: cartItem.quantity }] });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }

    }


    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    return (
        <Grid container sx={{ marginTop: '100px' }}>
            {product && (
                <>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ p: "20px" }}>
                            <CardMedia component="img" height="100%" image={selectedImage} alt={product.title} sx={{ width: '100%' }} />
                            {product.images.length > 1 && (
                                <Grid container spacing={1} mt={2}>
                                    {product.images.map((image) => (
                                        <Grid item key={image.id} md={6}>
                                            <CardMedia
                                                component="img"
                                                height="100%"
                                                image={image.url}
                                                alt={product.title}
                                                onClick={() => handleImageClick(image.url)}
                                                sx={{ width: '100%', cursor: 'pointer', opacity: image.url === selectedImage ? 1 : 0.5 }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 800 }}>
                                {product.title}
                            </Typography>
                            <Grid container alignItems="center" mt={2}>
                                <Rating name="totalrating" value={product.totalrating} readOnly sx={{ mr: 1 }} />
                                <Typography variant="body2" color="textSecondary">
                                    ({product.ratings.length} ratings)
                                </Typography>
                            </Grid>
                            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                                {product.description}
                            </Typography>
                        </CardContent>

                    </Grid>

                    <Grid item xs={12} md={3} paddingX={2}>
                        <Card>
                            <Grid container alignItems="center" px={2} py={4}>

                                <Grid item xs={6}>
                                    <Typography>Unit Price</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 600 }} align='right'>
                                        Rs.{product.price}.00
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography>Quantity</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                aria-label="decrease quantity"
                                                onClick={handleDecreaseQuantity}
                                            >
                                                <RemoveIcon fontSize='small' />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography>{quantity}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                color="primary"
                                                aria-label="increase quantity"
                                                onClick={handleIncreaseQuantity}
                                            >
                                                <AddIcon fontSize='small' />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                <Grid item xs={6}>
                                    <Typography>Total Price</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={{ fontWeight: 600 }} align='right'>
                                        Rs.{product.price * quantity}.00
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} mt={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={handleAddToCart}>
                                        Add to Cart
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                </>
            )}
        </Grid>
    );
};

export default Product;
