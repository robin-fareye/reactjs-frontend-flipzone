import React, { useEffect } from 'react'
import './Profile.css'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../header/Header'
import { Box, Typography } from '@mui/material';
import { getLoggedInUser } from '../../api/Login';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(1);
  const [email, setEmail] = useState("Email Id");
  const [name, setName] = useState("Name");
  const [role, setRole] = useState("Role");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  const getUserDetails = async () => {
    await getLoggedInUser()
      .then((user) => {
        setUserId(user?.userId);
        setName(user?.userName);
        setEmail(user?.userEmailId);
        setRole(user?.role);
      });
  }

  useEffect(() => {
    setCartItemCount(location?.state?.cartItemCount);
    getUserDetails();
  }, [])

  return (
    <>
      <Header cartItemCount={cartItemCount} userId={userId} />
      <Box className='profile-container'>
        <Box className='user-profile-outer-container'>
          <Box className='user-profile-container'>
            <Box className='user-profile-item'>
              <Typography variant='' className='user-profile-item-title'>Name:</Typography>
              <Typography variant='' className='user-profile-item-detail'>{name}</Typography>
            </Box>
            <Box className='user-profile-item'>
              <Typography variant='' className='user-profile-item-title'>Email ID:</Typography>
              <Typography variant='' className='user-profile-item-detail'>{email}</Typography>
            </Box>
            <Box className='user-profile-item'>
              <Typography variant='' className='user-profile-item-title'>Role:</Typography>
              <Typography variant='' className='user-profile-item-detail'>{role}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Profile