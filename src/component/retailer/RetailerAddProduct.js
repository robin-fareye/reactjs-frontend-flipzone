import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Input } from '@mui/material'
import './RetailerAddProduct.css'
import { listAll, ref } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../firebase/Firebase';
import { uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

const RetailerAddProduct = () => {

    const [formData, setFormData] = useState({ category: "", name: "", description: "", price: "", quantity: "", photo: "" })
    // const [formDataError, setformDataError] = useState({})
    const [imageUpload, setImageUpload] = useState(null)
    let imageName=""
    const imagesListRef = ref(storage, "images/");
    const handleChange = (event) => {
        const { name, value } = event?.target
        setFormData((prev) => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }

    const handleFileUpload = () => {
        if (imageUpload !== null) {
            imageName=imageUpload.name + v4()
            const imageRef = ref(storage, `images/${imageName}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {

                /////////////////////
                listAll(imagesListRef).then((response) => {
                    response.items.forEach((item) => {
                        if(item?._location?.path_===`images/${imageName}`){
                            getDownloadURL(item).then((url) => {
                                console.log(url);
                            });
                        }
                      
                    });
                  });


                //////////////////////////
            });
        }
    }
    const handleAdd = () => {
        handleFileUpload()
        console.log("adding product");
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
                variant="standard"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.category}
                name='category'
                className='text-field'
                label="Product Category"
                variant="standard"
            />
            <Input onChange={(event) => { setImageUpload(event?.target?.files[0]) }} type='file' />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.description}
                name='description'
                className='text-field'
                label="Product Description"
                variant="standard"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.price}
                name='price'
                className='text-field'
                label="Price of single item"
                variant="standard"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.quantity}
                name='quantity'
                className='text-field'
                label="Number of items"
                variant="standard"
            />

            <Button variant="contained" onClick={handleAdd} className="add-button">Add</Button>
        </Box>
    )
}

export default RetailerAddProduct;