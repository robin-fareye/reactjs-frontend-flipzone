import axios from "axios"

const placeOrder=async(payLoad)=>{
    const result= await axios.post('http://localhost:8085/order',payLoad)
    return result
}

export {placeOrder}