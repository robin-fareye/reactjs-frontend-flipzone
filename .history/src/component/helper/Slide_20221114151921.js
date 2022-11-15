import React from 'react';
import { Box, Typography, Button, Divider, makeStyles } from '@mui/material';
import Carousel from 'react-multi-carousel';

const useStyle = makeStyles(theme=> ({
    component: {

    },
    image: {

    },
    category: {

    },
    categoryText: {

    },
    button: {

    },
    wrapper: {

    },
    text:{

    },
}))

const multiSlide = ({ data, title}) => {
  const classes = useStyle();
  return (
    <Box className={classes.component}>
      <Box className={classes.category}>
        <Typography className={classes.categoryText}>{title}</Typography>
        <Button variant="contained" className={classes.button}>View All</Button>
      </Box>
      <Divider />
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        centerMode={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {
          data.map((temp) => (
            <Box textAlign="center" className={classes.wrapper}>
              <img src={temp.image} className={classes.image} alt="" />
              <Typography className={classes.text}>{temp.name}</Typography>
              <Typography className={classes.text}>{temp.price}</Typography>
            </Box>
          ))
        }
      </Carousel>
    </Box>
  )
}

const Slide = (props) => {
    return (
        <>
            {
                props.multi === true ? <multiSlide {...props} /> : ''
            }
        </>
    )
}

export default Slide;