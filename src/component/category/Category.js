import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { getAllCategories } from '../../api/CateogryApi';
import './Category.css'


const Category = ({ selectedCategory,setSelectedCategory }) => {
    const navigate = useNavigate();
    const [navData, setNavData] = useState([])
    const getNavData = async () => {
        let res = await getAllCategories()
        
        res?.data?.unshift({
            productCategoryId:null,
            productCategoryImageURL:"https://cdn-icons-png.flaticon.com/512/3843/3843517.png",
            productCategoryName:"All"
        })
        setNavData(res?.data)
    }
    useEffect(() => {
        getNavData()
    }, [])

    const getContainerStyle=(item)=>{
        if(item?.productCategoryId===selectedCategory){
            return "cat-container shadow-on-select"
        }
        else{
            return "cat-container"
        }
    }


    return (
        <Box className="cat-component">
            {
                navData.map((item, index) => (
                    <Box
                     
                     className={getContainerStyle(item)} key={index} onClick={() => setSelectedCategory(item.productCategoryId)}>
                        <img className="cat-image" alt="Category" src={item?.productCategoryImageURL} />
                        <Typography className="cat-text">{item?.productCategoryName}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default Category;