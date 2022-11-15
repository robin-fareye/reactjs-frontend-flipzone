import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { getAllCategories } from '../../api/CateogryApi';
import './Category.css'


const Category = () => {

    const [navData,setNavData]=useState([])
    const getNavData=async()=>{
        let res=await getAllCategories()
        setNavData(res?.data)
        console.log("dsjkfs: ",res?.data)
    }
    useEffect(()=>{
        getNavData()
    },[])
   

    return (
        <Box className="cat-component">
            {
                navData.map((item, index) => (
                    <Box className="cat-container" key={index}>
                        <img className="cat-image" alt="Category" src={item?.productCategoryImageURL} />
                        <Typography className="cat-text">{item?.productCategoryName}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Category;