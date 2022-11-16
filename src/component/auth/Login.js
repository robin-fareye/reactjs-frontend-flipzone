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
import { signUpUser, signInUser } from "../../api/Login"
import axios from "axios"
const Login = () => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)
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

    const handleSignIn = () => {
        // validateFormData()
        // const payLoad={
        //     username:formData.email,
        //     password:formData.password
        // }
        if (validateFormDataForLogin()) {
            const payLoad = `username=${formData.email}&password=${formData.password}`
            signInUser(payLoad)
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
                navigate('/',{state: {currentUserId:res?.data?.userId}})
            }


        }
    }
    const handleSignUpTextButton = () => {
        setIsLogin((prevState) => {
            return !prevState
        })
    }

    const validateFormDataForLogin=()=>{
        let count=0
        if (formData.email === "") {
            count++
            setFormDataError((prevState) => {
                return { ...prevState, emailError: true }
            })
        }
        else {
            setFormDataError((prevState) => {
                return { ...prevState, emailError: false }
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
        else {
            setFormDataError((prevState) => {
                return { ...prevState, emailError: false }
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
                        error={formDataError.emailError}
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
                        helperText={formDataError.passwordNotMatchedError ? "Password did'nt matched" : ""}
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