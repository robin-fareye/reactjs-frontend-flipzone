import { Box, Button, Typography } from '@mui/material'
import { getAllProducts } from '../../api/ProductApi'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { border } from '@mui/system'
import Header from '../header/Header'
import Category from '../category/Category'
import { addItemToCart } from '../../api/CartApi';

const ProductCatalouge = ({setCartItemCount, dataList}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [currentUserId, setCurrentUserId] = useState(location?.state?.currentUserId);
    const [products, setProducts] = useState([])

    useEffect(()=>{
        setProducts(dataList)
    },[dataList])
    
    const handleAddToCart = (item) => {
        const payload={
            userId:currentUserId,
            productId:item.productId,
            cartItemQuantity:1,
            cartItemPrice:item.productPrice
        }

        console.log("payload",payload);

        addItem(payload)
        setCartItemCount((prevCount)=>{
            return prevCount+1
        })
    }
    const addItem=async(payload)=>{
        const res=await addItemToCart(payload)
    }
    const getCardItem = (item, index) => {
        const description = item?.productDescription?.split('#');
        return (
            <Box style=
                {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding:'16px',
                    border:'1px solid rgb(233, 236, 242)',
                    webkitBoxShadow:'0 4px 6px -6px rgb(87, 87, 87)'
                }} className='item-card-container'>
                <img
                    style={{ height: "60px" }}
                    className='image-item-catalouge'
                    src={item.productImageURL}
                    alt='image'
                    onClick={() => navigate(`/product/${item?.productId}`, {state: {currentUserId:currentUserId, productId: item?.productId}})}
                />
                <Typography>{item.productName}</Typography>
                <Typography>{`$ ${item.productPrice}`}</Typography>
                <Typography>{description[0]}</Typography>
                <Button style={{marginTop:"13px"}} onClick={()=>handleAddToCart(item)} variant='contained'>Add To Cart</Button>
            </Box>
        )
    }
    
    return (
        <>
        <Box className='catalouge-container'>

            <Box className='catagory-container-box' style={{padding:"10px 30px"}}>
                <Grid className='item-grid-container' container spacing={{ xs: 5, md: 5 }} columns={{ xs: 4, sm: 20, md: 18, xl: 24 }}>
                    {products?.map((item, index) => (
                        <Grid item xs={2} sm={4} md={3} xl={3} key={index}>
                            {getCardItem(item, index)}
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
        </>
    )
}

export default ProductCatalouge

{/* {
            items?.map((item)=>{
                return getCardItem(item)
            })
        } */}