import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./ProductDetails.css"
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//const des="Lorem Ipsome Let music brighten up your mood anytime, anywhere with the boAt#235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call#Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease."
//const description=des.split("#")

const ProductDetails = () => {
    const id = 1;       //should get from route

    const [prodDetails, setProdDetails] = useState([])

    const getProduct = async () => {
        let res = await getProductById(id);
        setProdDetails(res?.data);
        console.log(res?.data);
    }

    useEffect(() => {
        getProduct()
    }, [])

    const description = prodDetails?.productDescription.split("#")

  return (
    <Box className='main-container'>
        <Box className='image-container'>
            <img 
            className='image-item'
            src={prodDetails.productImageURL}
            alt='prod-image'
            />
            <Box className='action-button-container'>
            <Button className='action-button cart-button' variant="contained">Add To Cart</Button>
            <Button className='action-button buy-now-button' variant="contained">Buy Now</Button>
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
  )
}

export default ProductDetails