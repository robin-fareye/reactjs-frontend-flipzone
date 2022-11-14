import { Box, Typography, Grid, Button, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'

const ProductCatalouge = () => {

    const [sort, setSort] = useState("asc");

    const getCardItem=(item)=>{
        return (
        <Box className='card-container'>
            <img 
            style={{height:"60px"}}
            className='image-item-catalouge'
            src='https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
            alt='image'
            />
            <Typography>{item.name}</Typography>
            <Typography>{item.price}</Typography>
            <Typography>{item.description}</Typography>
        </Box>
        )
    }
    const catagories=["cat1","cat2","cat3","cat4"]
    const items=[
        {
            name:"SOme item name",
            price:"$500",
            description:"something described"
        },
        {
            name:"SOme item name",
            price:"$500",
            description:"something described"
        },
        {
            name:"SOme item name",
            price:"$500",
            description:"something described"
        },
        {
            name:"SOme item name",
            price:"$500",
            description:"something described"
        },
        {
            name:"SOme item name",
            price:"$500",
            description:"something described"
        },
    ]
  return (
    <Box className='main-catalouge-container'>
       {catagories?.map((item)=>{
        return(
            <Box className='catagory-container'>
                <Box className='container-header'>
                    {item}
                </Box>
                <Box className='container-body'>
                    <Grid item lg={10}>
                        <Box className='sort'>
                            <Typography>Sort by</Typography>
                            {/* <Button onClick={() => setSort("popular")}>Popularity</Button> */}
                            <Button onClick={() => setSort("asc")}>Price--low to high</Button>
                            <Button onClick={() => setSort("desc")}>Price--high to low</Button>
                        </Box>
                        <Divider />
                        <Box className="inner-body">
                            {
                                items.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price)
                                .map((items)) => {
                                    return (
                                        getCardItem(items)
                                    )                            
                                }
                            }
                        </Box>
                    </Grid>
                </Box>
            </Box>
        )
       })}
    </Box>
  )
}

export default ProductCatalouge

 {/* {
            items?.map((item)=>{
                return getCardItem(item)
            })
        } */}