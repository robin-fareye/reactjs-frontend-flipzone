import {React,useEffect,useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './CheckoutPage.css'
import { getCartItems } from '../../api/CartApi'
import { Box, Button, TextField, Typography } from '@mui/material'
import { placeOrder } from '../../api/OrderApi'
const CheckoutPage = () => {


    // {
    //     "transactions": [
    //         {
    //             "paymentId": null,
    //             "mode": "GooglePay",
    //             "transactionDate": null,
    //             "userId": 2,
    //             "orderId": 4,
    //             "status": "Done"
    //         }
    //     ],
    //     "orderItems": [
    //         {
    //             "productId": null,
    //             "quantity": 1,
    //             "total": 1500.0
    //         }
    //     ],
    //     "user": {
    //         "userId": 2
    //     },
    //     "status": "On the Way",
    //     "total": 4000.0,
    //     "addressId": null,
    //     "orderDate": null
    // }
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([])
    const getItems = async () => {
        const res = await getCartItems(location?.state?.currentUserId)
        setItems(res?.data)
    }
console.log(items);
    useEffect(()=>{
        getItems()
    },[])

    const order=async(payload)=>{
        console.log("hello");
        let res = await placeOrder(payload)
    }
    const getOrderItems=()=>{
        let orderItems=items.map((item)=>{
            return {
                productId:item?.cartProductId,
                quantity:item?.cartProductQuantity,
                total:(item?.cartProductQuantity*item?.cartProductPrice)
            }
        })

        return orderItems
    }

    const getTotalAmount=()=>{
        let total=0;
        items.forEach(element => {
            total=total+(element?.cartProductPrice*element?.cartProductQuantity)
        });

        return total
    }
    const handlePlaceOrder=()=>{
        let payload={

        transactions: [
            {
                mode: "GooglePay",
                transactionDate: null,
                userId: 4,
                status: "Done"
            }

        ],
        orderItems:getOrderItems(),
        user:{
            userId:4
        },
        status: "On the Way",
        total:getTotalAmount(),
        addressId: null,
        orderDate: null
        }
        
        order(payload)
    }
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
                    <Button onClick={handlePlaceOrder} className='order-button' variant="outlined">Place Order</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CheckoutPage