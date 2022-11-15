import { Box, Button, Typography } from '@mui/material'
import { getAllProducts } from '../../api/ProductApi'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { border } from '@mui/system'

const ProductCatalouge = () => {

    const [products, setProducts] = useState([])

    const getProductList = async () => {
        let res = await getAllProducts()
        setProducts(res?.data)
        console.log(res?.data);
    }
    useEffect(() => {
        getProductList()
    }, [])
    const handleAddToCart = (index) => {
        
    }
    const getCardItem = (item, index) => {
        return (
            <Box style=
                {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding:'16px',
                    border:'1px solid rgb(233, 236, 242)',
                    webkitBoxShadow:'0 4px 6px -6px rgb(87, 87, 87)'
                }} className='item-card-container' onClick={() => window.location.replace(`/product/${item.productID}`)}>
                <img
                    style={{ height: "60px" }}
                    className='image-item-catalouge'
                    src='https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70'
                    alt='image'
                />
                <Typography>{item.productName}</Typography>
                <Typography>{item.productPrice}</Typography>
                <Typography>{item.productDescription}</Typography>
                <Button style={{marginTop:"13px"}} onClick={handleAddToCart(index)} variant='contained'>Add To Cart</Button>
            </Box>
        )
    }
    
    return (
        <Box className='main-catalouge-container'>

            <Box className='catagory-container'>
                <Grid className='item-grid-container' container spacing={{ xs: 5, md: 5 }} columns={{ xs: 4, sm: 20, md: 18, xl: 24 }}>
                    {products?.map((item, index) => (
                        <Grid item xs={2} sm={4} md={3} xl={3} key={index}>
                            {getCardItem(item, index)}
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    )
}

export default ProductCatalouge

{/* {
            items?.map((item)=>{
                return getCardItem(item)
            })
        } */}