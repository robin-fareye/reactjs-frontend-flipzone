import React, { useState, useEffect } from 'react'
import Category from '../category/Category'
import Header from '../header/Header'
import ProductCatalouge from '../ProductCatalogue/ProductCatalouge'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCartItems } from '../../api/CartApi'

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItemCount,setCartItemCount]=useState(0)
    const [currentUserId, setCurrentUserId] = useState(location?.state?.currentUserId);

    const getItemCount = async() => {
        let res= await getCartItems(currentUserId)
        console.log(res?.data?.length)
        setCartItemCount(res?.data?.length)
     }
 
     useEffect(() => {
         getItemCount()
     }, [])
     
  return (
    <>
    <Header
     cartItemCount={cartItemCount} userId={currentUserId}
    />
    <Category/>
    <ProductCatalouge setCartItemCount={setCartItemCount}/>
    </>
  )
}

export default HomePage