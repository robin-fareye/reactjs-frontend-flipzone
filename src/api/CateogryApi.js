import axios from "axios"
const getAllCategories=async()=>{
    let res=await axios.get(`http://localhost:8085/category`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting all categories")
        return "something went wrong while getting all categories"
        
    }
}
const getCategoryByProductId=async(id)=>{
    let res=await axios.get(`http://localhost:8085/category/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting category by product id")
        return "something went wrong while getting category by product id"
        
    }
}




export { getAllCategories , getCategoryByProductId}