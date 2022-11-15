import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import "./ProductDetails.css"
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const des="Lorem Ipsome Let music brighten up your mood anytime, anywhere with the boAt#235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call#Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease."
const description=des.split("#")

const ProductDetails = () => {
  return (
    <Box className='main-container'>
        <Box className='image-container'>
            <img 
            className='image-item'
            src='https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
            alt='image'
            />
            <Box className='action-button-container'>
            <Button className='action-button cart-button' variant="contained">Add To Cart</Button>
            <Button className='action-button buy-now-button' variant="contained">Buy Now</Button>
            </Box>
        </Box>
        <Box className='details-container'>
            <Typography className='mrbt-10' variant='h6' >This is the Name of Product</Typography>
            <Typography className='mrbt-10 section' variant='h4'>$ 1200</Typography>
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