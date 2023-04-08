import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';

const Product = () => {
    const productId = useParams().id;
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:7002/api/product/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.images[0].url);
            })
            .catch((err) => console.log(err));
    }, [productId]);

    const handleAddToCart = () => {
        console.log('Added to cart:', product);
    };

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: '100px' }}>
            {product && (
                <>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardMedia component="img" height="100%" image={selectedImage} alt={product.title} sx={{ width: '100%'}} />
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
                    <Grid item xs={12} md={7}>
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
                        <Grid container alignItems="center" p={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                    Rs.{product.price}.00
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" color="primary" fullWidth onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default Product;
