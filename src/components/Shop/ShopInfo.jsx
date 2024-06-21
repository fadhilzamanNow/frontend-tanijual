import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import styles from '../../styles/styles'
import axios from 'axios'
import { getAllProductsShop } from '../../redux/actions/product'
import { useParams } from 'react-router-dom'
import Loader from '../Layout/Loader'
import { FaChevronRight } from "react-icons/fa";


const ShopInfo = ({isOwner, isOpen, setIsOpen}) => {
    
    const {id} = useParams();
    const [data,setData] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [products,setProducts] = useState([])

    const [hasil,setHasil] = useState();

    useEffect(() => {
        console.log("hasil : ", hasil)
    },[hasil])
    

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${server}/shop/get-shop-info/${id}`,{withCredentials : true}).then((res) => {
            setData(res.data.shop);
            console.log(data)
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    },[])

    useEffect(() => {
        setIsLoading(true)
        console.log("data : ", data?.shopId)
        axios.get(`${server}/product/get-all-products-shop/${id}`).then((res) => {
            setProducts(res?.data?.products)
        }).catch((err) => {
            console.log(err)
        })
        
    },[])


    

    const logoutHandler = () => {
        axios.get(`${server}/shop/logout`, {withCredentials : true})
        window.location.reload();
    }

    const totalReviewsLength = products && products?.reduce((acc,product) => {
        return acc + product.reviews.length
},0)

    const totalRatings = products && products?.reduce((acc,product) => {
        return acc + product.reviews.reduce((sum,review) => {
            return sum + review.rating
        },0)
    },0)

    const averageRating = totalRatings / totalReviewsLength || 0;
    useEffect(() => {
        console.log("isi :  ", products)
    },[products])

    
  return (
    <>
    {
        isLoading ? (<Loader />) : (
            <div>
         <div className="w-full py-5">
            <div className="w-full item-center justify-center flex sm:hidden" onClick={() => setIsOpen(true)}>
            <FaChevronRight 
                className="text-[12px]"
            />
            </div>
            <div className="w-full item-center justify-center hidden sm:flex" onClick={() => setIsOpen(true)}>
            <img src={`${data?.avatar?.url}`} alt="" 
                    className=" w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] object-cover rounded-full" 
                />
            </div>
            <div className="hidden sm:block">

            
            <div className="">
            <h3 className="text-center py-2 text-[20px]">
                {data?.name}
            </h3>
            <p className="text-[16px] text-black p-[10px] flex items-center text-justify">
                {data?.description}
            </p>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Alamat
            </h5>
            <h4 className="text-black">
                {data?.address}
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Nomor
            </h5>
            <h4 className="text-black">
                0{data?.phoneNumber}
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Total Produk
            </h5>
            <h4 className="text-black">
                {products?.length}
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Rating Toko
            </h5>
            <h4 className="text-black">
                {averageRating} / 5
            </h4>
        </div>
        <div className="p-3">
            <h5 className="font-[600]">
                Bergabung Sejak
            </h5>
            <h4 className="text-black">
                {data?.createdAt.slice(0,10)}
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
    </div>
    </div>
        )
    }
    </>
  )
}

export default ShopInfo