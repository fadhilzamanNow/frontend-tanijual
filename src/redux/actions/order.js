import axios from "axios"
import {server} from "../../server.js"

export const getAllOrdersOfUser = (userId) => async(dispatch) => {
    try{
        dispatch({
            type : "getAllOrdersUserRequest"
        })

        const {data} = await axios.get(`${server}/order/get-all-orders/${userId}`,{withCredentials : true})

        dispatch({
            type : "getAllOrdersUserSuccess",
            payload : data.orders,
        })
    }
    catch(error){
        dispatch({
            type : "getAllOrdersUserFailed",
            payload : error.response.data.message
        })
    }
}


export const getAllOrdersOfShop = (shopId) => async(dispatch) => {
    try{
        dispatch({
            type : "getAllOrdersShopRequest"
        })

        const {data} = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`,{withCredentials : true})

        dispatch({
            type : "getAllOrdersShopSuccess",
            payload : data.orders,
        })
    }
    catch(error){
        dispatch({
            type : "getAllOrdersShopFailed",
            payload : error.response.data.message
        })
    }
}


