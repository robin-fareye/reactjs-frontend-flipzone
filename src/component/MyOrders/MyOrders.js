import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material';
import { getOrderByUserId } from '../../api/OrderApi';
import { Typography } from 'antd';

const MyOrders = () => {

    const navigate= useNavigate();
    const location = useLocation();
    const [ordersList,setOrdersList]=useState([])

    const getAllOrders=async()=>{
      let res=await getOrderByUserId(location?.state?.currentUserId)
      setOrdersList(res)
      console.log("orderData: ",res);
    }

    const renderOrderItem=(orderItem)=>{
      return (
        <Box className='order-item'>

            <Box className='order-item-image-container'>
                <img className='order-item-image' src={orderItem?.product?.productImageURL} />
            </Box>
            <Box className='order-item-details'>
                <Typography className='order-item-name' >{orderItem?.product?.productName}</Typography>
                <Typography>{orderItem?.product?.productDescription}</Typography>
                <Typography>{`Price: ${orderItem?.product?.productPrice} $`}</Typography>
                <Typography>{`Ordered Quantity: ${orderItem?.quantity}`}</Typography>
                <Typography>{`Total spent: ${orderItem?.total} $`}</Typography>
            </Box>

        </Box>
      )
    }

    const renderOrder=(order)=>{
        console.log("order: ",order);

        return(
          <Box className='single-order'>

            {
              order?.orderItems?.map((orderItem)=>{
                return renderOrderItem(orderItem)
              })
            }

          </Box>
        )

    }

    useEffect(()=>{
      getAllOrders()
    },[])
  return (
    <Box className="my-order-container">
        <Box className='order-list'>
           { ordersList?.map((item)=>{
                return renderOrder(item)
            })
}
        </Box>
    </Box>
  )
}

export default MyOrders