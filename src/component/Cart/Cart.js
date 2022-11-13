import React from 'react'
import './Cart.css'

import { Box, Button, Typography } from '@mui/material'

// const [itemCount,setItemCount] = React.useState(1);
const itemCount=2

const items = [
    { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name", price: "$200", seller: "some seller", },
    { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name", price: "$200", seller: "some seller", },
    { image: "https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70", name: "Some Random name", price: "$200", seller: "some seller", }
]

const renderCardItem = (item) => {
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
                            <Button style={{maxWidth:"30px"}} variant='text'>-</Button>
                        </Box>
                        <Box className='count-box'>
                            <Typography>2</Typography>
                        </Box>
                        <Box className='add-box'>
                        <Button style={{maxWidth:"30px"}}
                         variant='text'>+</Button>
                        </Box>
                    </Box>
                    <Button variant='text'>Remove</Button>
                </Box>
            </Box>
        </Box>
    )
}
const Cart = () => {
    return (
        <Box className='main-container'>
            <Box className='item-list'>
                <Box className='order-list-header'>
                    <Typography className='item-count'>{`My Cart(${itemCount})`}</Typography>
                </Box>
                <Box className='list-box'>
                    {items.map((item) => {
                        return renderCardItem(item)
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
                                <Typography variant='body1'>{`Price (${itemCount} item(s)):`}</Typography>
                                <Typography variant='body1'>{'$500'}</Typography>
                            </Box>
                            <Box className='table-structure'>
                                <Typography variant='body1'>{`Delivery charges:`}</Typography>
                                <Typography variant='body1'>{'$40'}</Typography>
                            </Box>
                            <Box className='table-structure' style={{marginBottom:"0px"}}>
                                <Typography variant='h6'>{`Total amount:`}</Typography>
                                <Typography variant='h6'>{'$500'}</Typography>
                            </Box>

                            <Button style={{width:"100%",marginTop:"30px"}} variant='contained'>Place Order</Button>
                        </Box>
                    </Box>
            </Box>
        </Box>
    )
}

export default Cart