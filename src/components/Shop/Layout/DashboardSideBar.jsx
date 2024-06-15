import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link, useNavigation } from 'react-router-dom'
import {VscNewFile} from "react-icons/vsc"
import {CiMoneyBill, CiSettings} from "react-icons/ci"
import { BiMessageSquareDetail } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import { CiLogout } from "react-icons/ci";
import axios from 'axios'
import { server } from '../../../server'
import { toast } from 'react-toastify'




const DashboardSideBar = ({active}) => {
    console.log("active" , active)
    
    const handleLogout = async () => {
        axios.get(`${server}/shop/logout`,{withCredentials : true}).then((res) =>{
            toast.success("Anda Telah Keluar")
            window.location.reload()
            
        }
        ).catch((err) => {
            toast.error("Terdapat Kesalahan, Gagal Logout")
        })
    }
  return (
    <div className="w-full h-[100vh] bg-white shadow-sm sticky top-0 left-0 z-10 border-r-gray-300 border">
        { /* single item */ }
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard" className="w-full flex items-center">
                <RxDashboard size={30}  className={`${active === 1 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 1 ? "text-red-400" : "grey"} `}>
                    Dashboard
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-orders" className="w-full flex items-center">
                <FiShoppingBag size={30}  className={`${active === 2 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 2 ? "text-red-400" : "grey"} `}>
                    Semua Pesanan
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-products" className="w-full flex items-center">
                <FiPackage size={30}  className={`${active === 3 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 3 ? "text-red-400" : "grey"} `}>
                    Semua Produk
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-create-product" className="w-full flex items-center">
                <AiOutlineFolderAdd size={30}  className={`${active === 4 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 4 ? "text-red-400" : "grey"} `}>
                    Membuat Produk
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-events" className="w-full flex items-center">
                <MdOutlineLocalOffer size={30}  className={`${active === 5 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 5 ? "text-red-400" : "grey"} `}>
                    Semua Promo
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-create-event" className="w-full flex items-center">
                <VscNewFile size={30}  className={`${active === 6 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 6 ? "text-red-400" : "grey"} `}>
                    Membuat Promo
                </h5>
            </Link>
        </div>
        
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-messages" className="w-full flex items-center">
                <BiMessageSquareDetail size={30}  className={`${active === 8 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 8 ? "text-red-400" : "grey"} `}>
                    Pesan 
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-coupons" className="w-full flex items-center">
                <AiOutlineGift size={30}  className={`${active === 9 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 9 ? "text-red-400" : "grey"} `}>
                    Kode Diskon
                </h5>
            </Link>
        </div>
       {/*  <div className="w-full flex items-center p-4">
            <Link to="/dashboard-refunds" className="w-full flex items-center">
                <HiOutlineReceiptRefund size={30}  className={`${active === 10 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 10 ? "text-red-400" : "grey"} `}>
                    Pembatalan
                </h5>
            </Link>
        </div> */}
        <div className="w-full flex items-center p-4">
            <Link to="/settings" className="w-full flex items-center">
                <CiSettings size={30}  className={`${active === 11 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 11 ? "text-red-400" : "grey"} `}>
                    Pengaturan
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4 cursor-pointer" onClick={() => handleLogout()}>
            
                <CiLogout size={30}  className={`${active === 12 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 12 ? "text-red-400" : "grey"} `}>
                    Keluar
                </h5>
            
        </div>
    </div>
  )
}

export default DashboardSideBar