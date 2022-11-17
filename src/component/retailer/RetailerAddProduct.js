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
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { border, borderRadius } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const RetailerAddProduct = () => {

    const location=useLocation()
    const navigate=useNavigate()
    const [formData, setFormData] = useState({ category: "", name: "", description: "", price: "", quantity: "", photo: "", imageUrl: "" })
    // const [formDataError, setformDataError] = useState({})
    const [imageUpload, setImageUpload] = useState(null)
    const [categoryData, setCategoryData] = useState([])
    const [isAddDisabled,setIsAddDisabled]=useState(true)
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
                                console.log("now here");
                                setIsAddDisabled(false);
                                setFormData((prevState) => {
                                    console.log("URL",url);
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
        navigate('/retailer',{state:{currentUserId:location?.state?.currentUserId}})
        
    }

    const handleSetImageUpload=(file)=>{
        setImageUpload(()=>{
            return file
        })
        
    }
    const handleUpload=()=>{
        handleFileUpload()
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
            userId: location?.state?.currentUserId,
            productPrice: parseInt(formData.price),
            productDescription: formData.description,
            productQuantity: parseInt(formData.quantity),
            productImageURL: formData.imageUrl,
            categoryId: id
        }
        

        uploadProduct(payload)

        
    }

    return (
        <Box className="main-details-container">
            <Typography
                variant='h4'
                className='container-header'>Add Your Product</Typography>
            <TextField
                className="add-product-input"
                required onChange={(e) => handleChange(e)}
                value={formData.name}
                name='name'
                label="Product Name"
                variant="outlined"
            />
            <FormControl variant="standard" sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    displayEmpty
                    variant="outlined"
                    name='category'
                    style={{minWidth:"400px",maxWidth:"400px"}}
                    onChange={(e) => handleChange(e)}
                    //input={<OutlinedInput />}
                    value={formData.category}
                    // inputProps={{ 'aria-label': 'Without label' }}
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
            
                <Input style={{
                    width:"400px" ,border:"1px solid #d3d3d3",
                    borderRadius:"3px",borderBottom:"0px",height:"58px",marginBottom:"4px"
                    }} onChange={(event) => { handleSetImageUpload(event?.target?.files[0]) }} type='file' />
                <Button variant='contained' onClick={handleFileUpload}>Upload</Button>
               

            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.description}
                name='description'
                className="add-product-input"
                label="Product Description"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.price}
                name='price'
                className="add-product-input"
                label="Price of single item"
                variant="outlined"
            />
            <TextField
                required onChange={(e) => handleChange(e)}
                value={formData.quantity}
                name='quantity'
                className="add-product-input"
                label="Number of items"
                variant="outlined"
            />
            

            <Button disabled={isAddDisabled} variant="contained" onClick={handleAdd} className="add-button">Add</Button>
        </Box>
    )
}

export default RetailerAddProduct;