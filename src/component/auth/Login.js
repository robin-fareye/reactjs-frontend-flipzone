/* eslint-disable */
import React, { useState } from 'react'
import './Login.css'
import Box from '@mui/material/Box'
import { Typography, TextField, Button } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {  useNavigate} from 'react-router';
import FormLabel from '@mui/material/FormLabel';
import { signUpUser, signInUser, getLoggedInUser } from "../../api/Login"
import axios from "axios"
const Login = () => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({ userName: "", email: "", password: "", confirmPassword: "", userType: "ROLE_USER" })
    const [formDataError, setFormDataError] = useState({})
    const handleChange = (event) => {
        const { name, value } = event?.target
        setFormData((prevData) => {
            return ({
                ...prevData,
                [name]: value
            })
        })
        //validateFormData()
    }
    
    const signIn=async()=>{
        const payLoad = `username=${formData.email}&password=${formData.password}`
        let res= await signInUser(payLoad)
        if(res!==null){
            if(res?.role==="ROLE_RETAILER"){
                navigate('/retailer',{state: {currentUserId:res?.userId}})
            }
            else{
                console.log(res?.userId);
                navigate('/homePage',{state: {currentUserId:res?.userId}})
            }
        }

       
    }

    const handleSignIn = () => {
        if (validateFormDataForLogin()) {
            signIn()
        }
    }

    const handleSignUp = async() => {

        if (validateFormData()) {
            const payLoad = {
                userName: formData.userName,
                userEmailId: formData.email,
                password: formData.password,
                role: formData.userType
            }

            let res=await signUpUser(payLoad)
            if(res?.data?.userId!==null){
                
                if(res?.data?.role==="ROLE_RETAILER"){
                    navigate('/retailer',{state: {currentUserId:res?.data?.userId}})
                }
                else{
                    navigate('/homePage',{state: {currentUserId:res?.data?.userId}})
                }

            }


        }
    }
    const handleSignUpTextButton = () => {
        setIsLogin((prevState) => {
            return !prevState
        })
    }

    const isValidEmail = (val) => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/ //eslint-disable-line
        if(regex.test(val)){
            return true;
        }
        return false;
    }

    const validateFormDataForLogin=()=>{
        let count=0
        if (formData.email === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, emailError: true }
            })
        }
        else if(!isValidEmail(formData.email)) {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, emailValidError: false }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, emailError: false }
            })
            setFormDataError((prevState) => {
                return { ...prevState, emailValidError: false }
            })
        }
        if (formData.password === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, passwordError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, passwordError: false }
            })
        }
        if (count > 0) {
            return false
        }
        return true
    }
    const validateFormData = () => {
        let count = 0;
        if (formData.userName === "") {
            setFormDataError((prevState) => {
                count++
                return { ...prevState, userNameError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, userNameError: false }
            })
        }
        if (formData.email === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, emailError: true }
            })
        }
        else if(!isValidEmail(formData.email)) {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, emailValidError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, emailError: false }
            })
            setFormDataError((prevState) => {
                return { ...prevState, emailValidError: false }
            })
        }
        if (formData.password === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, passwordError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, passwordError: false }
            })
        }
        if (formData.confirmPassword === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, confirmPasswordError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, confirmPasswordError: false }
            })
        }
        if (formData.password !== formData.confirmPassword) {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, passwordNotMatchedError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, passwordNotMatchedError: false }
            })
        }
        if (count > 0) {
            return false
        }
        return true

    }
    return (
        <Box  className="main-login-container">
            <Box className="left-section" >
                <Typography
                    variant='h3'
                    className='left-box-text'>FlipZone</Typography>
                <Typography
                    variant='h4'
                    className='left-box-text'>The One-stop Shopping Destination</Typography>

                <img className="logo-image" alt="LOGO" src={require('../../assets/logo.png')} />
            </Box>
            <Box className="right-section">
                <Box className='login-container'>
                    <Typography
                        variant='h3'
                        className='welcome-text'>Welcome to FlipZone</Typography>


                    <Typography
                        variant='body1'
                        className='welcome-subtext'>{isLogin ? "Login with your credentials" : "Sign Up to continue"}</Typography>
                    {!isLogin && <TextField
                        required onChange={(e) => handleChange(e)}
                        error={formDataError.userNameError}
                        value={formData.userName} name='userName'
                        className='auth-text-field' label="Name" variant="outlined" />}
                    <TextField
                        required onChange={(e) => handleChange(e)}
                        error={formDataError.emailError || formDataError.emailValidError}
                        helperText={formDataError.emailValidError? "Email is not valid" : ""}
                        value={formData.email} name='email' className='auth-text-field'
                        label="Email Address" variant="outlined" />
                    <TextField
                        required onChange={(e) => handleChange(e)}
                        value={formData.password} name='password'
                        error={formDataError.passwordError}
                        className='auth-text-field' label="Password"
                        type="password" variant="outlined" />
                    {!isLogin && <TextField
                        required onChange={(e) => handleChange(e)}
                        error={formDataError.confirmPasswordError || formDataError.passwordNotMatchedError}
                        helperText={formDataError.passwordNotMatchedError ? "Password did not match" : ""}
                        value={formData.confirmPassword} name='confirmPassword'
                        className='auth-text-field' label="Confirm Password"
                        variant="outlined" />}

                    {!isLogin && <FormControl>
                        <FormLabel id="user-type">User Type:</FormLabel>
                        <RadioGroup
                            row
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                        >
                            <FormControlLabel className='user-type-item' value="ROLE_USER" control={<Radio />} label="Buyer" />
                            <FormControlLabel className='user-type-item' value="ROLE_RETAILER" control={<Radio />} label="Seller" />

                        </RadioGroup>
                    </FormControl>}
                    <Button variant="contained" onClick={isLogin ? handleSignIn : handleSignUp} className="login-button">{isLogin ? "Log In" : "Sign Up"}</Button>
                    <Box className='sign-up-container'>
                        <Typography className='sign-up-text'>{isLogin ? "Don't have an account? " : "Already have an account? "}</Typography>
                        <Button onClick={handleSignUpTextButton} variant="text" className="sign-up-text-button">{!isLogin ? "Log In" : "Sign Up"}</Button>
                    </Box>


                </Box>
            </Box>
        </Box>
    )
}

export default Login