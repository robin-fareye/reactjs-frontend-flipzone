import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Input } from '@mui/material'
import './RetailerAddProduct.css'
import { listAll, ref } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../firebase/Firebase';
import { uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { postProduct } from '../../api/ProductApi';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAllCategories } from "../../api/CateogryApi"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const RetailerAddProduct = () => {

    const [formData, setFormData] = useState({ category: "", name: "", description: "", price: "", quantity: "", photo: "", imageUrl: "" })
    // const [formDataError, setformDataError] = useState({})
    const [imageUpload, setImageUpload] = useState(null)
    const [categoryData, setCategoryData] = useState([])
    let imageName = ""
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
    const getCategoryData = async () => {
        const result = await getAllCategories()
        setCategoryData(result?.data)
        console.log(result?.data);
    }
    useEffect(() => {
        getCategoryData()
    }, [])

    const handleFileUpload = () => {
        if (imageUpload !== null) {
            imageName = imageUpload.name + v4()
            const imageRef = ref(storage, `images/${imageName}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                listAll(imagesListRef).then((response) => {
                    response.items.forEach((item) => {
                        if (item?._location?.path_ === `images/${imageName}`) {
                            getDownloadURL(item).then((url) => {
                                console.log(url);
                                setFormData((prevState) => {
                                    return { ...prevState, imageUrl: url }
                                })
                            });
                        }

                    });
                });
            });
        }
    }

    const uploadProduct=async(payload)=>{
        let res=await postProduct(payload)
        console.log(res)
    }
    const handleAdd = () => {
        let id
        categoryData?.filter((item)=>{
            if(item.productCategoryName===formData.category){
                id=item.productCategoryId
            }
        })

        const payload = {
            productName: formData.name,
            userId: 1,
            productPrice: parseInt(formData.price),
            productDescription: formData.description,
            productQuantity: parseInt(formData.quantity),
            productImageURL: formData.imageUrl,
            categoryId: id
        }

        uploadProduct(payload)

        
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
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    displayEmpty
                    name='category'
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput />}
                    value={formData.category}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {categoryData?.map((item) => (
                        <MenuItem
                            key={item.productCategoryId}
                            value={item.productCategoryName}
                        >
                            {item.productCategoryName
                            }
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box style={{ display: 'flex' }}>
                <Input onChange={(event) => { setImageUpload(event?.target?.files[0]) }} type='file' />
                <Button onClick={handleFileUpload} variant='contained'>upload</Button>
            </Box>

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