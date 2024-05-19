import React, { useEffect } from 'react'
import ShopLogin from "../components/Shop/ShopLogin.jsx"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
    const {isSeller, isLoading} = useSelector((state) => state.seller);
    console.log("dari sini login ", isSeller);
    const navigate = useNavigate()
    useEffect(() => {
        if(isSeller === true) {
        navigate(`/dashboard`)
        }
    },[isLoading, isSeller])
  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage