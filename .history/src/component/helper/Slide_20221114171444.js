import React from 'react';
import { Box, Typography, Button, Divider, makeStyles } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import './Slide.css';


const CarouselCardItem = ({item, index}) => {
    return (
        <Box textAlign="center" className="wrapper" key={index}>
            <img src={item.image} className="image" alt="" />
            <Typography className="text">{item.name}</Typography>
            <Typography className="text">{item.price}</Typography>
        </Box>
    )
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
            //draggable={false}
            //responsive={responsive}
            //centerMode={true}
            //infiniteLoop={true}
            //autoPlay={true}
            //autoPlaySpeed={10000}
            //keyBoardControl={true}
            //showIndicators={false}
            //containerClass="carousel-container"
            //itemClass="carousel-item-padding-40-px"
            //axis='vertical'
            //direction=''
            data={data}
            renderItem={CarouselCardItem}
            useScrollView={true}
            showThumbs={false}
        />
    </div>
    </Box>
  )
}

const Slide = (props) => {
    return (
        <Box className="component">
            <Box className="category">
                <Typography className="categoryText">{props.title}</Typography>
                <Button variant="contained" className="button">View All</Button>
            </Box>
            <Divider />
            <div className="carousel">
                <Carousel
                    //swipeable={false}
                    //draggable={false}
                    //responsive={responsive}
                    //centerMode={true}
                    //infiniteLoop={true}
                    //autoPlay={true}
                    //autoPlaySpeed={10000}
                    //keyBoardControl={true}
                    //showIndicators={false}
                    //containerClass="carousel-container"
                    //itemClass="carousel-item-padding-40-px"
                    //axis='vertical'
                    //direction=''
                    data={props.data}
                    renderItem={CarouselCardItem}
                    useScrollView={true}
                    showThumbs={false}
                />
            </div>
        </Box>
    )
}

export default Slide;