import axios from 'axios'

const getUserAddresses = async (id) => {
    let res = await axios.get(`http://localhost:8085/address/u/${id}`)
    if (res?.status === 200) {
        return res
    }
    else {
        console.warn("something went wrong while getting products category wise")
        return "something went wrong while getting products category wise"
        
    }
}

const addAddressForUser = async (payLoad) => {
    const res = axios.post('http://localhost:8085/address', payLoad)
    return res
}

export {getUserAddresses, addAddressForUser}