import React, { useState, useEffect} from 'react'
import Header from '../header/Header'
import ProductDetails from '../ProductDetails/ProductDetails'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCartItems } from '../../api/CartApi'

export const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(location?.state?.currentUserId);
    const [productId, setProductId] = useState(location?.state?.productId)
    
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
        <Header cartItemCount={cartItemCount} userId={currentUserId} />
        <ProductDetails productId={productId} currentUserId={currentUserId} setCartItemCount={setCartItemCount}/>
    </>
  )
}

export default ProductPage;
