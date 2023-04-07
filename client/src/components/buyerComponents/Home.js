import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { Box, Paper } from '@mui/material';

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


    return (
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
                        <img src={item.image} alt={item.caption} style={{ maxHeight: "400px" }}/>
                    </Paper>
                ))}
            </Carousel>
        </Box>
    )
}

export default Home
