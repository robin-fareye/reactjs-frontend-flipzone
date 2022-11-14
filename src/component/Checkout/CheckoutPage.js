import React from 'react'
import './CheckoutPage.css'
import { Box, Button, TextField, Typography } from '@mui/material'
const CheckoutPage = () => {
    return (
        <Box className='checkout-container'>
            <Box className='address-container'>
                <Box className='address-table'>
                    <Typography variant='h6'>Address:</Typography>
                    <TextField
                        required 
                        className='checkout-fields'
                        // onChange={(e)=>handleChange(e)} 
                        size='small'
                        // value={formData.email} name='email' className='auth-text-field' 
                        label="Address Line" variant="outlined" />
                    <TextField
                        required 
                        className='checkout-fields'
                        // onChange={(e)=>handleChange(e)} 
                        size='small'
                        // value={formData.email} name='email' className='auth-text-field' 
                        label="Pin Code" variant="outlined" />
                </Box>
            </Box>
            <Box className='payment-details'>
            <Box className='payment-table'>
                    <Typography variant='h6'>Payment:</Typography>
                    <TextField
                        required 
                        className='checkout-fields'
                        // onChange={(e)=>handleChange(e)} 
                        size='small'
                        // value={formData.email} name='email' className='auth-text-field' 
                        label="Card Holder's Name" variant="outlined" />
                        <TextField
                        required 
                        className='checkout-fields'
                        // onChange={(e)=>handleChange(e)} 
                        size='small'
                        // value={formData.email} name='email' className='auth-text-field' 
                        label="Card Number" variant="outlined" />
                    <TextField
                        required 
                        className='checkout-fields'
                        // onChange={(e)=>handleChange(e)} 
                        size='small'
                        // value={formData.email} name='email' className='auth-text-field' 
                        label="CVV" variant="outlined" />
                    <Button className='order-button' variant="outlined">Place Order</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CheckoutPage