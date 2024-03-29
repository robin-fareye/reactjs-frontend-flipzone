import { React, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './CheckoutPage.css'
import { clearCart, getCartItems } from '../../api/CartApi'
import { Box, Button, TextField, Typography } from '@mui/material'
import { placeOrder } from '../../api/OrderApi'
import { getUserAddresses, addAddressForUser } from '../../api/UserApi'

const CheckoutPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([])
    const [formData, setFormData] = useState({ address: "", pinCode: "", cardNumber: "", cardHolder: "", cvv: "" })
    const [formDataError, setFormDataError] = useState({})
    const [selectedAddress, setSelectedAddress] = useState([])
    const [addressList, setAddressList] = useState([])
    console.log(location?.state?.currentUserId)

    const getAddressList = async () =>{
        let res = await getUserAddresses(location?.state?.currentUserId)
        setAddressList(res?.data)
    }

    useEffect(() => {
        getAddressList()
    }, [])


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
        let count = 0
        if(selectedAddress===""){
            if (formData.address === "") {
                count++
                setFormDataError((prevState) => {
                    return { ...prevState, addressError: true }
                })
            } else {
                setFormDataError((prevState) => {
                    return { ...prevState, addressError: false }
                })
            }
            if (formData.pinCode === "") {
                count++
                setFormDataError((prevState) => {
                    return { ...prevState, pinCodeError: true }
                })
            } else {
                setFormDataError((prevState) => {
                    return { ...prevState, pinCodeError: false }
                })
            }
        }
        if (formData.cardNumber === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cardNumberError: true }
            })
        } else {
            setFormDataError((prevState) => {
                return { ...prevState, cardNumberError: false }
            })
        }
        if (formData.cardHolder === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cardHolderError: true }
            })
        } else {
            setFormDataError((prevState) => {
                return { ...prevState, cardHolderError: false }
            })
        }
        if (formData.cvv === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, cvvError: true }
            })
        } else {
            setFormDataError((prevState) => {
                return { ...prevState, cvvError: false }
            })
        }

        if (count > 0) {
            return false
        }
        return true
    }

    const getItems = async () => {
        const res = await getCartItems(location?.state?.currentUserId)
        setItems(res?.data)
    }
    useEffect(() => {
        getItems()
    }, [])

    const deleteCart=async()=>{
        let res = await clearCart(location?.state?.currentUserId)
        if(res?.status===200){
            navigate("/homePage" , {state:{currentUserId:location?.state?.currentUserId}})
        }
    }

    const order = async (payload) => {

        console.log("hello:",payload);
        let res = await placeOrder(payload)
        deleteCart()
    }
    const getOrderItems = () => {
        let orderItems = items?.map((item) => {

            return ({
                product: {productId:item?.product?.productId},
                quantity: item?.cartItemQuantity,                
                total: item?.cartItemQuantity*item?.cartItemPrice
            })
        })
        console.log("orderItms: ",orderItems);
        return orderItems
    }

    const getTotalAmount = () => {
        let total = 0;
        items.forEach(element => {
            total = total + (element?.cartItemPrice * element?.cartItemQuantity)
        });

        return total
    }
    const handlePlaceOrder = () => {
        if (validateFormData()) {
            let payload = {

                transactions: [
                    {
                        mode: "GooglePay",
                        transactionDate: null,
                        userId: location?.state?.currentUserId,
                        status: "Done"
                    }

                ],
                orderItems: getOrderItems(),
                user: {
                    userId: location?.state?.currentUserId
                },
                status: "On the Way",
                total: getTotalAmount(),
                addressId: selectedAddress?.address_id,
                orderDate: null
            }
            console.log(selectedAddress?.addressId)
            order(payload)
        }
    }

    const handleAddNewAddress=()=>{
        const payload = {
            pinCode :  formData.pinCode,
            description: formData.address,
            userId: location?.state?.currentUserId
        }

        console.log(payload);
        postNewAddress(payload)
        
    }

    const postNewAddress = async (payload) => {
        let res = await addAddressForUser(payload)
    }
    const handleSelectAddress = (item, index) => {
        setSelectedAddress(item)
    }

    const renderAddresssCard = (item, index) => {
        return (
            <Box style={{ color: selectedAddress === item ? "#0D4C92" : "rgba(99, 97, 97, 0.493)" }} className='address-card' onClick={() => handleSelectAddress(item, index)}>
                <Typography variant='body1' className='address-text'>{`Address Line: ${item?.description}`}</Typography>
                <Typography variant='body2' className='address-text'>{`Pin Code: ${item?.pinCode}`}</Typography>
            </Box>
        )
    }
    return (
        <Box className='checkout-container'>
            <Box className='address-container'>
                <Box className='address-table'>
                    <Typography variant='h6'>Address:</Typography>
                    <TextField
                        required
                        className='checkout-fields'
                        onChange={(e) => handleChange(e)}
                        size='small'
                        value={formData.address}
                        error={formDataError.addressError}
                        label="Address Line"
                        name='address'
                        variant="outlined" />
                    <TextField
                        required
                        className='checkout-fields'
                        onChange={(e) => handleChange(e)}
                        size='small'
                        value={formData.pinCode}
                        error={formDataError.pinCodeError}
                        label="Pin Code"
                        name='pinCode'
                        variant="outlined" />
                    <Button onClick={handleAddNewAddress} className='order-button' variant="outlined">Add Address</Button>
                </Box>
                <Box className='address-list'>

                    {
                        addressList?.map((item, index) => {
                            return renderAddresssCard(item, index)
                        })
                    }

                    
                </Box>
            </Box>
            <Box className='payment-details'>
                <Box className='payment-table'>
                    <Typography variant='h6'>Payment:</Typography>
                    <TextField
                        required
                        className='checkout-fields'
                        onChange={(e) => handleChange(e)}
                        size='small'
                        value={formData.cardHolder}
                        error={formDataError.cardHolderError}
                        label="Card Holder's Name"
                        name='cardHolder'
                        variant="outlined" />
                    <TextField
                        required
                        className='checkout-fields'
                        onChange={(e) => handleChange(e)}
                        size='small'
                        value={formData.cardNumber}
                        error={formDataError.cardNumberError}
                        label="Card Number"
                        name='cardNumber'
                        variant="outlined" />
                    <TextField
                        required
                        className='checkout-fields'
                        onChange={(e) => handleChange(e)}
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