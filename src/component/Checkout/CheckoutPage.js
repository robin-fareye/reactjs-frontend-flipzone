import {React,useEffect,useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './CheckoutPage.css'
import { getCartItems } from '../../api/CartApi'
import { Box, Button, TextField, Typography } from '@mui/material'
import { placeOrder } from '../../api/OrderApi'

const CheckoutPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([])
    const [formData, setFormData] = useState({ address: "", pinCode: "", cardNumber: "", cardHolder: "", cvv: ""})
    const [formDataError, setFormDataError] = useState({})
    
    const handleChange = (event) => {
        const { name, value } = event?.target
        setFormData((prevData) => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }

    const validateFormData = () => {
        let count=0
        if(formData.address === ""){
            count++
            setFormDataError((prevState) => {
                return { ...prevState, addressError: true }
            })
        }else {
            setFormDataError((prevState) => {
                return { ...prevState, addressError: false}
            })
        }
        if(formData.pinCode === ""){
            count++
            setFormDataError((prevState) => {
                return { ...prevState, pinCodeError: true }
            })
        }else {
            setFormDataError((prevState) => {
                return { ...prevState, pinCodeError: false}
            })
        }
        if(formData.cardNumber === ""){
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cardNumberError: true }
            })
        }else {
            setFormDataError((prevState) => {
                return { ...prevState, cardNumberError: false}
            })
        }
        if(formData.cardHolder === ""){
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cardHolderError: true }
            })
        }else {
            setFormDataError((prevState) => {
                return { ...prevState, cardHolderError: false}
            })
        }
        if(formData.cvv === ""){
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cvvError: true }
            })
        }else {
            setFormDataError((prevState) => {
                return { ...prevState, cvvError: false}
            })
        }

        if(count > 0) {
            return false
        }
        return true
    }

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
        if(validateFormData()){
            let payload={

                transactions: [
                    {
                        mode: "GooglePay",
                        transactionDate: null,
                        userId: location?.state?.currentUserId,
                        status: "Done"
                    }
        
                ],
                orderItems:getOrderItems(),
                user:{
                    userId:location?.state?.currentUserId
                },
                status: "On the Way",
                total:getTotalAmount(),
                addressId: null,
                orderDate: null
                }
                
            order(payload)
        }
    }
    return (
        <Box className='checkout-container'>
            <Box className='address-container'>
                <Box className='address-table'>
                    <Typography variant='h6'>Address:</Typography>
                    <TextField
                        required 
                        className='checkout-fields'
                        onChange={(e)=>handleChange(e)} 
                        size='small'
                        value={formData.address}
                        error={formDataError.addressError}
                        label="Address Line" 
                        name='address'
                        variant="outlined" />
                    <TextField
                        required 
                        className='checkout-fields'
                        onChange={(e)=>handleChange(e)} 
                        size='small'
                        value={formData.pinCode}
                        error={formDataError.pinCodeError}
                        label="Pin Code" 
                        name='pinCode'
                        variant="outlined" />
                </Box>
            </Box>
            <Box className='payment-details'>
            <Box className='payment-table'>
                    <Typography variant='h6'>Payment:</Typography>
                    <TextField
                        required 
                        className='checkout-fields'
                        onChange={(e)=>handleChange(e)} 
                        size='small'
                        value={formData.cardHolder}
                        error={formDataError.cardHolderError}
                        label="Card Holder's Name"
                        name='cardHolder'
                        variant="outlined" />
                    <TextField
                        required 
                        className='checkout-fields'
                        onChange={(e)=>handleChange(e)} 
                        size='small'
                        value={formData.cardNumber}
                        error={formDataError.cardNumberError}
                        label="Card Number"
                        name='cardNumber'
                        variant="outlined" />
                    <TextField
                        required 
                        className='checkout-fields'
                        onChange={(e)=>handleChange(e)} 
                        size='small'
                        value={formData.cvv}
                        error={formDataError.cvvError}
                        label="CVV" 
                        name='cvv'
                        variant="outlined" />
                    <Button onClick={handlePlaceOrder} className='order-button' variant="outlined">Place Order</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CheckoutPage