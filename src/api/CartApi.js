import axios from "axios";

const addItemToCart=async(payload)=>{
    let res=await axios.post('/cartItem',payload)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}
const getCartItems=async(id)=>{
    let res=await axios.get(`/cartItem/u/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}


const decreaseCartItem=async(id)=>{
    let res=await axios.put(`/cartItem/decrease/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}

const increaseCartItem=async(id)=>{
    let res=await axios.put(`/cartItem/increase/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}

const deleteCartItem=async(id)=>{
    console.log("CARD ITEM ID: ", id);
    let res=await axios.delete(`/cartItem/c/`+id)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}


export {addItemToCart,getCartItems,decreaseCartItem,increaseCartItem,deleteCartItem}