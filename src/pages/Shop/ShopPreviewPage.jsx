import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from '../../components/Layout/Header';
import { Button, Drawer } from "flowbite-react";
import axios from 'axios';
import { server } from '../../server';
import { useParams } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";



const ShopPreviewPage = () => {

  const [isOpen,setIsOpen] = useState(false)
  const {id} = useParams();
  const [data,setData] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [products,setProducts] = useState([])

  useEffect(() => {
    console.log("isopen")
  },[isOpen])


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

  const handleClose = () => setIsOpen(false);
  return (
    <div className="relative">
    <Header />
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex   relative mt-20 sm:mt-0 gap-x-4">
          <div className="w-auto bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll sticky top-0 left-0 h-[100vh] px-4">
            <ShopInfo isOwner={false} isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
          <div className="w-[72%] rounded-[4px]">
            <ShopProfileData isOwner={false} />
          </div>
         </div>
    </div>
    {
      isOpen ? (
        <div className="absolute top-0 left-0 z-[999999999999999999999999999999999999999999999999]">
      
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Informasi Toko" />
        <Drawer.Items>
          <div>
          <div className="w-full flex item-center justify-center" onClick={() => setIsOpen(true)}>
                <img src={`${data?.avatar?.url}`} alt="" 
                    className=" w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] object-cover rounded-full" 
                />
            </div>
            <div className="">

            
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
            5
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
        
        </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </div>
      ) : (
        null 
      )
    }
    </div>
  )
}

export default ShopPreviewPage