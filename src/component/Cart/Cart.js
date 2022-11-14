import React from 'react'
import './Cart.css'
import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material'

const Cart = () => {

    const [itemCount,setItemCount] = useState(1);
    const [items,setItems]=useState([
        { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name 1", price: 100, seller: "some seller", quantity:1},
        { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name 2", price: 200, seller: "some seller", quantity:1},
        { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name 3", price: 300, seller: "some seller", quantity:1}
    ])
    
    const handleIncrease=(index)=>{
        setItems((prevState)=>{
            const item=prevState[index]
            let arr=[...prevState]
            arr[index].quantity=arr[index].quantity+1
            return arr
        })
    }
    const handleReduce=(index)=>{
        setItems((prevState)=>{
            const item=prevState[index]
            let arr=[...prevState]
            arr[index].quantity=arr[index].quantity-1
            return arr
        })
    }
    const getTotalAmount=()=>{
        let sum=0
        items?.forEach(element => {
            sum=sum+(element?.price * element?.quantity)
        });
        return sum
    }
    const getTotalQuantity=()=>{
        let sum=0
        items?.forEach(element => {
            sum=sum+ element?.quantity
        });
        return sum
    }
    
    const handleRemove=(index)=>{
        setItems((prevState)=>{
            const item=prevState[index]
            let arr=[...prevState]
            arr.splice(index,1)
            console.log(arr);
            return arr
        })
    }
    const renderCardItem = (item,index) => {
        return (
            <Box className="card-list-container">
                <Box className='image-and-count'>
                    <img
                        // className='image-item-catalouge'
                        src={item.image}
                        alt='image'
                    />
                </Box>
                <Box className='description'>
                    <Typography variant='h6'>{item.name}</Typography>
                    <Typography variant='body2'>{`Seller: ${item.seller}`}</Typography>
                    <Typography style={{ marginTop: "13px" }} variant='h5'>{item.price}</Typography>
                    <Box className="action-button-container">
                        <Box className='counter'>
                            <Box className='remove-box'>
                                <Button disabled={item.quantity===0} onClick={()=>handleReduce(index)} style={{maxWidth:"30px"}} variant='text'>-</Button>
                            </Box>
                            <Box className='count-box'>
                                <Typography>{item.quantity}</Typography>
                            </Box>
                            <Box className='add-box'>
                            <Button onClick={()=>handleIncrease(index)} style={{maxWidth:"30px"}}
                             variant='text'>+</Button>
                            </Box>
                        </Box>
                        <Button onClick={()=>handleRemove(index)} variant='text'>Remove</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
    return (
        <Box className='main-container'>
            <Box className='item-list'>
                <Box className='order-list-header'>
                    <Typography className='item-count'>{`My Cart(${items?.length})`}</Typography>
                </Box>
                <Box className='list-box'>
                    {items?.map((item,index) => {
                        return renderCardItem(item,index)
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
                            <Box className='table-structure' style={{marginBottom:"0px"}}>
                                <Typography variant='h6'>{`Total amount:`}</Typography>
                                <Typography variant='h6'>{(getTotalAmount()+40)}</Typography>
                            </Box>

                            <Button style={{width:"100%",marginTop:"30px"}} variant='contained'>Place Order</Button>
                        </Box>
                    </Box>
            </Box>
        </Box>
    )
}

export default Cart