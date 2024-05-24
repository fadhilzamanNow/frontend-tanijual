import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

// load user
export const loadUser = () => async(dispatch) => {
    try {   
        dispatch({
            type:  "LoadUserRequest",
        });
        const {data} = await axios.get(`${server}/user/getuser`, {withCredentials:true});
        dispatch({
            type : "LoadUserSuccess",
            payload : data.user
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error,
        });
    }
}

//load seller
export const loadSeller = () => async(dispatch) => {
    try {   
        dispatch({
            type:  "LoadSellerRequest",
        });
        const {data} = await axios.get(`${server}/shop/getSeller`, {withCredentials:true});
        dispatch({
            type : "LoadSellerSuccess",
            payload : data.seller
        })
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error,
        });
    }
}

// update informasi pengguna action
export const updateUserInformation = (email,password,phoneNumber,name) => async(dispatch,action) => {
    try{
        dispatch({
            type : "updateUserInfoRequest"
        });

        const {data} = await axios.put(`${server}/user/update-user-info`,{
            email,
            password,
            phoneNumber,
            name
        },{withCredentials : true});

        dispatch({
            type : "updateUserInfoSuccess",
            payload : data.user
        })
        toast.success("Informasimu berhasil diupdate");
        setTimeout(() => {
            window.location.reload()
        },1000)
    }catch(error){
        dispatch({
            type : "updateUserInfoFailed",
            payload : error.response.data.message
        })
        toast.error("Maaf terdapat sebuah kesalahan ", error)
    }
}

export const updateUserAddress = (country,city,address1,address2,addressType,zipCode) => async(dispatch) => {
    try {
        dispatch({
            type : "updateUserAddressRequest"
        })

        const {data} = await axios.put(`${server}/user/update/-user-addresses`, {
            country,
            city,
            address1,
            address2,
            addressType,
            zipCode
        },{withCredentials : true})

        dispatch({
            type : "updateUserAddressSuccess",
            payload : {
                successMessage : `Selamat kamu berhasil menambahkan alamatmu`,
                user : data.user
            }
        })


    }catch(error){
        dispatch({
            type : "updateUserAddressFailed",
            payload : error.response.data.message
        })
       
    }
}
// delete alamat pengguna
export const deleteUserAdddress = (id) => async (dispatch) => {
    try{
        dispatch({
            type : "deleteUserAddressRequest"
        })

        const {data} = await axios.delete(`${server}/user/delete-user-address/${id}`,{withCredentials : true})

        dispatch({
            type : "deleteUserAddressSuccess",
            payload : {
                user : data.user,
                successMessage : `Selamat kamu berhasil menghapus alamat`
            }
        })
    }
    catch(error){
        dispatch({
            type : "deleteUserAddressFailed",
            payload : error.response.data.message
        })
    }
}