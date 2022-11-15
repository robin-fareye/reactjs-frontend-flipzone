import { Box, Typography } from '@mui/material'
import React from 'react'

const RetailerCatalouge = () => {

    const getCardItem=(item)=>{
        return (
        <Box className='card-container'>
            <img 
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
    <Box className='main-container'>
        {
            items?.map((item)=>{
                return getCardItem(item)
            })
        }
    </Box>
  )
}

export default ProductCatalouge