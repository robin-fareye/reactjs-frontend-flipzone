import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material';
import { getOrderByUserId } from '../../api/OrderApi';

const MyOrders = () => {

    const navigate= useNavigate();
    const location = useLocation();
    const [ordersList,setOrdersList]=useState([])

    const getAllOrders=async()=>{
      let res=await getOrderByUserId(location?.state?.currentUserId)
      console.log("orderData: ",res);
    }

    useEffect(()=>{
      getAllOrders()
    },[])
  return (
    <Box className="my-order-container">

    </Box>
  )
}

export default MyOrders