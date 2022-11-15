import axios from "axios";

const addItemToCart=async(payload)=>{
    let res=await axios.post('http://localhost:8085/cartItem',payload)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}
const getCartItems=async(id)=>{
    let res=await axios.get(`http://localhost:8085/cartItem/u/2`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}


export {addItemToCart,getCartItems}