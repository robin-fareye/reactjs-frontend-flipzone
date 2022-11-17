import axios from "axios"

const placeOrder=async(payLoad)=>{
    const result= await axios.post('http://localhost:8085/order',payLoad)
    return result
}

const getOrderByUserId=async(id)=>{
    const result = await axios.get(`http://localhost:8085/order/u/${id}`)
    if(result?.status===200){
        return result?.data
    }
}
export {placeOrder,getOrderByUserId}