import React, { useEffect } from 'react'
import './Cart.css'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../header/Header'
import { Box, Button, Typography } from '@mui/material'
import { getCartItems, increaseCartItem , decreaseCartItem, deleteCartItem} from '../../api/CartApi';

const Cart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [itemCount, setItemCount] = useState(1);
    const [items, setItems] = useState([])

    let id=null
    useEffect(()=>{
        id=location?.state?.currentUserId
    },[])
    console.log(id)
    const getItems = async (id) => {
        const res = await getCartItems(id)
        setItems(res?.data)
    }
    const increaseItem=async(id,index)=>{
       let res= await increaseCartItem(id)
       //getItems()
       setItems((prevState) => {
            const item = prevState[index]
            let arr = [...prevState]
            arr[index].cartItemQuantity = item?.cartItemQuantity + 1
            return arr
        })
    }
    const decreaseItem=async(id,index)=>{
        let res= await decreaseCartItem(id)
        //getItems()
         setItems((prevState) => {
            const item = prevState[index]
            let arr = [...prevState]
            arr[index].cartItemQuantity = item.cartItemQuantity - 1
            return arr
        })
     }

    useEffect(() => {
        getItems(location?.state?.currentUserId)
    },[])
    const handleIncrease = (index) => {
       
        
        let id=items[index]?.cartItemId
        increaseItem(id,index)
        
    }
    const handleReduce = (index) => {
       
        let id=items[index]?.cartItemId
        decreaseItem(id,index)
        
       
    }
    const getTotalAmount = () => {
        let sum = 0
        items?.forEach(element => {
            sum = sum + (element?.cartItemPrice * element?.cartItemQuantity)
        });
        return sum
    }
    const getTotalQuantity = () => {
        let sum = 0
        items?.forEach(element => {
            sum = sum + element?.cartItemQuantity
        });
        return sum
    }

    const deleteProduct=async(cartItemId)=>{
        await deleteCartItem(cartItemId)
        getItems(location?.state?.currentUserId)
    }
    const handleRemove = (index) => {
        // setItems((prevState) => {
        //     const item = prevState[index]
        //     let arr = [...prevState]
        //     arr.splice(index, 1)
        //     console.log(arr);
        //     return arr
        // })

        let product=items[index]
        let cartItemId=product?.cartItemId
        deleteProduct(cartItemId)



    }

    const handlePlaceOrder = () => {
        navigate("/checkout", {state: {currentUserId:location?.state?.currentUserId}})
    }

    const renderCardItem = (item, index) => {
        return (
            <Box className="card-list-container">
                <Box className='image-and-count'>
                    <img
                        style={{maxWidth:"100%",minWidth:"100%"}}
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
                                <Button onClick={item?.cartItemQuantity===1?() => handleRemove(index):() => handleReduce(index)} style={{ maxWidth: "30px" }} variant='text'>-</Button>
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
        {/* <Header userId={location?.state?.currentUserId}/> */}
        <Box className='main-cart-container'>
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