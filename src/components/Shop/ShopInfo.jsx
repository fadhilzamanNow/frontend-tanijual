import React from 'react'
import { useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import styles from '../../styles/styles'
import axios from 'axios'

const ShopInfo = ({isOwner}) => {
    const {seller} = useSelector((state) => state.seller)

    const logoutHandler = () => {
        axios.get(`${server}/shop/logout`, {withCredentials : true})
        window.location.reload();
    }
  return (
    <div>
         <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
                <img src={`${backend_url}/${seller?.avatar}`} alt="" 
                    className="w-[150px] h-[150px] object-cover rounded-full"
                />
            </div>
            <h3 className="text-center py-2 text-[20px]">
                {seller?.name}
            </h3>
            <p className="text-[16px] text-black p-[10px] flex items-center text-justify">
                {seller?.description}
            </p>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Alamat
            </h5>
            <h4 className="text-black">
                {seller?.address}
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Nomor
            </h5>
            <h4 className="text-black">
                0{seller?.phoneNumber}
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Total Produk
            </h5>
            <h4 className="text-black">
                10
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Rating Toko
            </h5>
            <h4 className="text-black">
                4.51 / 5
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Bergabung Sejak
            </h5>
            <h4 className="text-black">
                {seller?.createdAt.slice(0,10)}
            </h4>
        </div>
        {
            isOwner && (
                <div className="py-3 px-4">
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                        <span className="text-center text-white">
                            Edit Toko
                        </span>
                    </div>
                    <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={logoutHandler}>
                        <span className="text-center text-white">
                            Keluar
                        </span>
                    </div>
                </div>
            )
        }
    </div>

   
  )
}

export default ShopInfo