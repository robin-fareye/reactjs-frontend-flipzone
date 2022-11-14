import React from 'react';
import { Box, Typography, Button, Divider, makeStyles } from '@mui/material';
import Carousel from 'react-multi-carousel';
import './Slide.css';

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3,
    }
}

const MultiSlide = ({ data, title}) => {
  
  return (
    <Box className="component">
      <Box className="category">
        <Typography className="categoryText">{title}</Typography>
        <Button variant="contained" className="button">View All</Button>
      </Box>
      <Divider />
      <div className="carousel">
        <Carousel
            //swipeable={false}
            draggable={false}
            responsive={responsive}
            //centerMode={true}
            //infiniteLoop={true}
            autoPlay={true}
            autoPlaySpeed={10000}
            //keyBoardControl={true}
            showIndicators={false}
            //containerClass="carousel-container"
            //itemClass="carousel-item-padding-40-px"
            //axis='vertical'
            //direction=''
        >
            <div className="carousel">
                {
                data.map((temp) => (
                    <Box textAlign="center" className="wrapper" key={temp}>
                    <img src={temp.image} className="image" alt="" />
                    <Typography className="text">{temp.name}</Typography>
                    <Typography className="text">{temp.price}</Typography>
                    </Box>
                ))
                }
            </div>
        </Carousel>
    </div>
    </Box>
  )
}

const Slide = (props) => {
    return (
        <div>
            <MultiSlide {...props} />
        </div>
    )
}

export default Slide;