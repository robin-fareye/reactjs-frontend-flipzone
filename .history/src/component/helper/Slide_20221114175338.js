import React from 'react';
import { Box, Typography, Button, Divider, makeStyles } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import './Slide.css';


const CarouselCardItem = (item) => {
    console.log(',,,,,,,,,,,,,,,')
    return (
        <Box textAlign="center" className="wrapper">
            <img src={item.image} className="image" alt="" />
            <Typography className="text">{item.name}</Typography>
            <Typography className="text">{item.price}</Typography>
        </Box>
    )
}

const Slide = (props) => {
    //console.log(".............",props.data);
    return (
        <>
        {/* <CarouselCardItem item={props.data[1]}/> */}
        <Box className="component">
            <Box className="category">
                <Typography className="categoryText">{props.title}</Typography>
                <Button variant="contained" className="button">View All</Button>
            </Box>
            <Divider />
            <div className="carousel">
                <Carousel
                    data={props.data}
                    renderItem = {CarouselCardItem}
                    useScrollView={true}
                    //showThumbs={false}
                />
            </div>
        </Box>
        </>
    )
}

export default Slide;