import axios from "axios"

const signUpUser=async(payLoad)=>{
    const result= await axios.post('/user',payLoad)
    return result
}

const signInUser=async(payLoad)=>{
    const result= await axios.post('/login',payLoad,{
        "content-type": "application/x-www-form-urlencoded",
    })

    return result
}
export  {signUpUser,signInUser}