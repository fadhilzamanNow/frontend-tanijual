import React, { useEffect } from 'react'
import ShopCreate from "../components/Shop/ShopCreate.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {
    const {isSeller, seller} = useSelector((state) => state.seller);
    console.log("dari sini daftar seller ", isSeller);
    const navigate = useNavigate()
    useEffect(() => {
        if(isSeller === true) {
        navigate(`/shop/${seller._id}`)
        }
    },[])
  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage