import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import "./ProductDetails.css"
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Header from '../header/Header'
import { getProductById } from '../../api/ProductApi';
import { addItemToCart } from '../../api/CartApi';


const ProductDetails = ({productId, currentUserId}) => {
    const navigate = useNavigate();
    const location = useLocation();
    //const { productId } = useParams();
    //const [productId, setProductId] = useState(location?.state?.productId)
    //const [currentUserId, setCurrentUserId] = useState(location?.state?.currentUserId)
    const [prodDetails, setProdDetails] = useState([])

    const getProduct = async () => {
        let res = await getProductById(productId);
        setProdDetails(res?.data);
    }

    useEffect(() => {
        getProduct()
    }, [])

    const addItem=async(payload)=>{
        const res=await addItemToCart(payload)
    }
    const handleAddToCart=()=>{

        const payload={
            userId:currentUserId,
            productId:prodDetails.productId,
            cartItemQuantity:1,
            cartItemPrice:prodDetails.productPrice
        }

        addItem(payload)
    }

    const handleBuyNow =()=> {
        
        navigate("/checkout", {state: {}})
    }

    const description = prodDetails?.productDescription?.split("#")

  return (
    <>
    <Box className='main-container'>
        <Box className='image-container'>
            <img 
            className='image-item'
            src={prodDetails.productImageURL}
            alt='prod-image'
            />
            <Box className='action-button-container'>
            <Button onClick={handleAddToCart} className='action-button cart-button' variant="contained">Add To Cart</Button>
            <Button className='action-button buy-now-button' variant="contained" onClick={handleBuyNow}>Buy Now</Button>
            </Box>
        </Box>
        <Box className='details-container'>
            <Typography className='mrbt-10' variant='h6' >{prodDetails.productName}</Typography>
            <Typography className='mrbt-10 section' variant='h4'>${prodDetails.productPrice}</Typography>
            <Typography className='mrbt-10' variant='body1'>Description: </Typography>
            <Box className='section'>
            {description?.map((listItem)=>{
                return(
                    <Box className='description-container mrbt-10'>
                        <ArrowRightIcon className='icon-tag' />
                        <Typography  variant='body2'>{listItem}</Typography>
                    </Box>
                )
            })}
            </Box>
            {/* <Typography className='mrbt-10' variant='body2'>{des}</Typography> */}
            <Typography className='mrbt-10 ' variant='body1'>Available Offers: </Typography>
            <Box className='offer mrbt-10'>
                <LocalOfferIcon className='icon-tag'/>
                <Typography variant='body2'>Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
            </Box>
            <Box className='offer mrbt-10'>
                <LocalOfferIcon className='icon-tag'/>
                <Typography variant='body2'>Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</Typography>
            </Box>
            <Box className='offer mrbt-10'>
                <LocalOfferIcon className='icon-tag'/>
                <Typography variant='body2'>Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
            </Box>
            <Box className='offer mrbt-10'>
                <LocalOfferIcon className='icon-tag'/>
                <Typography variant='body2'>Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography>
            </Box>
        </Box>
    </Box>
    </>
  )
}

export default ProductDetails