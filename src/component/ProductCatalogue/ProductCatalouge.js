import { Box, Typography } from '@mui/material'
import { getAllProducts } from '../../api/ProductApi' 
import React, { useEffect, useState } from 'react'

const ProductCatalouge = () => {

    const [products,setProducts]=useState([])

    const getProductList=async()=>{
       let res=await getAllProducts()
       setProducts(res?.data)
    }
    useEffect(()=>{
        getProductList()
    },[])
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