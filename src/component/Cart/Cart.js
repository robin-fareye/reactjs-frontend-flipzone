import React, { useEffect } from 'react'
import './Cart.css'
import { useState } from 'react';
import Header from '../header/Header'
import { Box, Button, Typography } from '@mui/material'
import { getCartItems } from '../../api/CartApi';

const Cart = () => {

    const [itemCount, setItemCount] = useState(1);
    const [items, setItems] = useState([])


    const getItems = async () => {
        const res = await getCartItems()
        console.log(res?.data);
        setItems(res?.data)
    }

    useEffect(() => {
        getItems()
    },[])
    const handleIncrease = (index) => {
        setItems((prevState) => {
            const item = prevState[index]
            let arr = [...prevState]
            arr[index].quantity = arr[index].quantity + 1
            return arr
        })
    }
    const handleReduce = (index) => {
        setItems((prevState) => {
            const item = prevState[index]
            let arr = [...prevState]
            arr[index].quantity = arr[index].quantity - 1
            return arr
        })
    }
    const getTotalAmount = () => {
        let sum = 0
        items?.forEach(element => {
            sum = sum + (element?.price * element?.quantity)
        });
        return sum
    }
    const getTotalQuantity = () => {
        let sum = 0
        items?.forEach(element => {
            sum = sum + element?.quantity
        });
        return sum
    }

    const handleRemove = (index) => {
        setItems((prevState) => {
            const item = prevState[index]
            let arr = [...prevState]
            arr.splice(index, 1)
            console.log(arr);
            return arr
        })
    }

    const handlePlaceOrder = () => {
        window.location.replace("/checkout")
    }

    const renderCardItem = (item, index) => {
        return (
            <Box className="card-list-container">
                <Box className='image-and-count'>
                    <img
                        style={{maxWidth:"280px"}}
                        // className='image-item-catalouge'
                        src={item?.product?.productImageURL}
                        alt='image'
                    />
                </Box>
                <Box className='description'>
                    <Typography variant='h6'>{item?.product?.productName}</Typography>
                    <Typography variant='body2'>{`Seller: ${item.seller}`}</Typography>
                    <Typography style={{ marginTop: "13px" }} variant='h5'>{item?.product?.productPrice}</Typography>
                    <Box className="action-button-container">
                        <Box className='counter'>
                            <Box className='remove-box'>
                                <Button disabled={item?.cartItemQuantity === 0} onClick={() => handleReduce(index)} style={{ maxWidth: "30px" }} variant='text'>-</Button>
                            </Box>
                            <Box className='count-box'>
                                <Typography>{item?.cartItemQuantity}</Typography>
                            </Box>
                            <Box className='add-box'>
                                <Button onClick={() => handleIncrease(index)} style={{ maxWidth: "30px" }}
                                    variant='text'>+</Button>
                            </Box>
                        </Box>
                        <Button onClick={() => handleRemove(index)} variant='text'>Remove</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
    return (
        <>
        <Header />
        <Box className='main-container'>
            <Box className='item-list'>
                <Box className='order-list-header'>
                    <Typography className='item-count'>{`My Cart(${items?.length})`}</Typography>
                </Box>
                <Box className='list-box'>
                    {items?.map((item, index) => {
                        return renderCardItem(item, index)
                    })}
                </Box>
            </Box>
            <Box className='order-details'>
                <Box className='summery-card'>
                    <Box className='summery-header'>
                        <Typography variant='h6'>Order Summery</Typography>
                    </Box>
                    <Box className='summery-content'>
                        <Box className='table-structure'>
                            <Typography variant='body1'>{`Price (${getTotalQuantity()} item(s)):`}</Typography>
                            <Typography variant='body1'>{getTotalAmount()}</Typography>
                        </Box>
                        <Box className='table-structure'>
                            <Typography variant='body1'>{`Delivery charges:`}</Typography>
                            <Typography variant='body1'>{'$40'}</Typography>
                        </Box>
                        <Box className='table-structure' style={{ marginBottom: "0px" }}>
                            <Typography variant='h6'>{`Total amount:`}</Typography>
                            <Typography variant='h6'>{(getTotalAmount() + 40)}</Typography>
                        </Box>

                        <Button style={{ width: "100%", marginTop: "30px" }} variant='contained' onClick={handlePlaceOrder}>Place Order</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default Cart