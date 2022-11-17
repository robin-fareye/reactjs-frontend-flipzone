import React, { useState, useEffect } from 'react'
import Category from '../category/Category'
import Header from '../header/Header'
import ProductCatalouge from '../ProductCatalogue/ProductCatalouge'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCartItems } from '../../api/CartApi'
import { getAllProducts, getProductById, getProductCategorywise, getProductBySearch } from '../../api/ProductApi'

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0)
  const [currentUserId, setCurrentUserId] = useState(location?.state?.currentUserId);
  const [selectedCategory,setSelectedCategory]=useState(null)
  const [searchText, setSearchText] = useState("")
  const [dataList, setDataList] = useState([])

  const getProductList = async () => {
    let res = await getAllProducts()
    setDataList(res?.data)
  }
  useEffect(() => {
    getProductList()
  }, [])
 
  const getCategoryWiseProduct=async()=>{
    let res=await getProductCategorywise(selectedCategory)
    setDataList(res?.data)
  }
  useEffect(()=>{
    if(selectedCategory!==null){
      getCategoryWiseProduct()
    }
    else{
      getProductList()
    }
  },[selectedCategory])
  const getItemCount = async () => {
    let res = await getCartItems(currentUserId)
    console.log(res?.data?.length)
    setCartItemCount(res?.data?.length)
  }

  const getSearchWiseProduct = async () => {
    let res = await getProductBySearch(searchText);
    setDataList(res?.data)
  }

  useEffect(() => {
    getItemCount()
  }, [])

  useEffect(() => {
    if(searchText===""){
      getProductList()
      
    }
    else{
      getSearchWiseProduct()
      
    }
    
  }, [searchText])


  return (
    <>
      <Header
        cartItemCount={cartItemCount} userId={currentUserId} setSearchText={setSearchText} 
      />
      <Category 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory} />
      <ProductCatalouge 
      dataList={dataList}
      setCartItemCount={setCartItemCount} />
    </>
  )
}

export default HomePage