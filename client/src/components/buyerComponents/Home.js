import React, { useState, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
import { Link } from "react-router-dom";
import { Box, Paper, Card, CardMedia, CardContent, Typography, Rating, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

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
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        fetch("http://localhost:7005/api/product")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, []);

    const handleFilterButtonClick = () => {
        let url = `http://localhost:7005/api/product?`;

        if (minPrice) {
            url += `price[gte]=${minPrice}&`;
        }

        if (maxPrice) {
            url += `price[lte]=${maxPrice}&`;
        }

        if (category) {
            url += `category=${category}&`;
        }

        if (brand) {
            url += `brand=${brand}&`;
        }

        if (sortBy) {
            url += `sort=${sortBy}&`;
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    };

    const handleClearButtonClick = () => {
        setMinPrice("");
        setMaxPrice("");
        setCategory("");
        setBrand("");
        setSortBy("")
        fetch("http://localhost:7005/api/product")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    };

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

            <Box sx={{display: "flex", alignItems: "center", py: 2, px: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={2}>
                        <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} size='small'/>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField fullWidth label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} size='small'/>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField type='number' fullWidth label="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} size='small'/>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField type='number' fullWidth label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}  size='small'/>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth sx={{ minWidth: 120 }} size='small'>
                            <InputLabel>Sort by</InputLabel>
                            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <MenuItem value="createdAt">Newest</MenuItem>
                                <MenuItem value="-createdAt">Oldest</MenuItem>
                                <MenuItem value="-price">Price high to low</MenuItem>
                                <MenuItem value="price">Price low to high</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={1}>
                        <Button variant='contained' startIcon={<FilterAltIcon/>} color='primary' onClick={handleFilterButtonClick} fullWidth>Filter</Button>
                    </Grid>

                    <Grid item xs={12} md={1}>
                        <Button variant='outlined' startIcon={<ClearIcon/>} color='inherit' onClick={handleClearButtonClick} fullWidth>Clear</Button>
                    </Grid>

                </Grid>
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
                                        <CardMedia component="img" height="auto" image={product.images[0].url} alt={product.title} sx={{ pb: 1 }} />
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
