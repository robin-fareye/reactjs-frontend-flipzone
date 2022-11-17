/* eslint-disable */
import axios from "axios"

const signUpUser=async(payLoad)=>{
    const result= await axios.post('/user',payLoad)
    return result
}

const getLoggedInUser=async()=>{
    const result= await axios.get(`/getUser`)
    if(result?.status===200){
        return result?.data
    }
}

const signInUser=async(payLoad)=>{
    const result= await axios.post(`/login` , payLoad)
    //console.log(result);
    if(result?.status===202){
        let res=getLoggedInUser()
        return res
    }
}

const logoutUser=async()=>{
    const result= await axios.get(`/logout`)
    return result
}
export  {signUpUser,signInUser,getLoggedInUser,logoutUser}
