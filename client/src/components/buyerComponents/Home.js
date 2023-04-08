import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
import { Link } from "react-router-dom";
import { Box, Paper, Card, CardMedia, CardContent, Typography, Rating, Grid } from '@mui/material';

const Home = () => {

    const items = [
        {
            image: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/banners/hp-cleansebanners040523_001hden-us.jpg',
            caption: 'Image 1 caption'
        },
        {
            image: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/banners/hp-bcaabanner-040523_002hden-us.jpg',
            caption: 'Image 2 caption'
        },
        {
            image: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cms/banners/wdhdbanner0405_004hden-us.jpg',
            caption: 'Image 3 caption'
        }
    ];


    const indicatorStyles = {
        marginTop: '-20px',
        marginBottom: '20px'
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:7002/api/product")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, []);


    return (
        <Box sx={{ overflowX: "hidden", marginTop: "96px" }}>
            <Box>
                <Carousel
                    indicatorContainerProps={{
                        style: indicatorStyles
                    }}
                    animation="slide"
                    timeout={500}
                    style={{ maxHeight: "100px" }}
                >
                    {items.map((item, index) => (
                        <Paper key={index}>
                            <img src={item.image} alt={item.caption} style={{ maxHeight: "400px" }} />
                        </Paper>
                    ))}
                </Carousel>
            </Box>

            <Grid container>
                <Grid container spacing={2} sx={{ px: 2 }}>
                    {products.map((product) => (
                        <Grid item xs={12} md={2} key={product._id} marginY={3}>
                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    display: "flex",
                                    py: 2,
                                    flexDirection: "column",
                                    height: "100%",
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                                    }
                                }}>
                                    {product.images && product.images.length > 0 && (
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={product.images[0].url}
                                            alt={product.title}
                                            sx={{ pb: 1 }}
                                        />
                                    )}

                                    <CardContent sx={{ flex: 1 }}>
                                        <Box>

                                            <Typography variant="h6" gutterBottom style={{ fontWeight: 800 }}>
                                                {product.title}
                                            </Typography>

                                            <Typography variant="h6" color="black">
                                                Rs.{product.price}.00
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                            <Rating name="totalrating" value={product.totalrating} readOnly />
                                            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                                ({product.ratings.length} ratings)
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                                            {product.description.slice(0, 45)}...
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home
