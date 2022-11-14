import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material'
import './RetailerAddProduct.css'

const RetailerAddProduct = () => {

    const [formData, setFormData] = useState({category:"", name:"", description:"", price:"", quantity:"", photo: ""})
    // const [formDataError, setformDataError] = useState({})

    const handleChange = (event) => {
        const {name, value} = event?.target
        setFormData((prev) => {
            return ({...prev,
            [name]:value})
        })
    }

    const handleAdd = () => {

    }

    return (
        <Box className="main-container">
            <Typography
                variant='h4'
                className='container-header'>Add Your Product</Typography>
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.name}
                name='name'
                className='text-field'
                label="Product Name"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.category}
                name='category'
                className='text-field'
                label="Product Category"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.photo}
                name='photo'
                className='text-field'
                label="Product Photo URL"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.description}
                name='description'
                className='text-field'
                label="Product Description"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.price}
                name='price'
                className='text-field'
                label="Price of single item"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.quantity}
                name='quantity'
                className='text-field'
                label="Number of items"
                variant="outlined"
            />

            <Button variant="contained" onClick={handleAdd} className="add-button">Add</Button>
        </Box>
    )
}

export default RetailerAddProduct;