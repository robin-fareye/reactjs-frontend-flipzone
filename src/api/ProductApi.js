import axios from "axios"

const getAllProducts = async() => {
    let res=await axios.get('http://localhost:8085/product')
        if (res?.status === 200) {
            return res
        }
        else {
            console.warn("something went wrong while fetching all products")
            return "something went wrong while fetching all products"
            
        }
}

const postProduct=async()=>{
    let res=await axios.post('http://localhost:8085/product')
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while posting products")
        return "something went wrong while posting products"
        
    }
}

const getProductById=async(id)=>{
    let res=await axios.get(`http://localhost:8085/product/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting product by id")
        return "something went wrong while getting product by id"
        
    }
}
const getProductBySearch=async(keyword)=>{
    let res=await axios.get(`http://localhost:8085/product/search/${keyword}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while searching products")
        return "something went wrong while searching products"
        
    }
}

const getProductCategorywise=async(id)=>{
    let res=await axios.get(`http://localhost:8085/product/c/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting products category wise")
        return "something went wrong while getting products category wise"
        
    }
}

const getProductSellerWise=async(id)=>{
    let res=await axios.get(`http://localhost:8085/product/u/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting products seller wise")
        return "something went wrong while getting products seller wise"
        
    }
}




export { getAllProducts,postProduct ,getProductById,getProductBySearch,getProductCategorywise,getProductSellerWise}