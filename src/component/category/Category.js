import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { getAllCategories } from '../../api/CateogryApi';
import './Category.css'


const Category = () => {
    const navigate = useNavigate();
    const [navData,setNavData]=useState([])
    const getNavData=async()=>{
        let res=await getAllCategories()
        setNavData(res?.data)
    }
    useEffect(()=>{
        getNavData()
    },[])
   

    return (
        <Box className="cat-component">
            {
                navData.map((item, index) => (
                    <Box className="cat-container" key={index} onClick = {() => navigate("/", {state: {categoryId: item.productCategoryId}})}>
                        <img className="cat-image" alt="Category" src={item?.productCategoryImageURL} />
                        <Typography className="cat-text">{item?.productCategoryName}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Category;