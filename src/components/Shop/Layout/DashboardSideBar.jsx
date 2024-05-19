import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import {VscNewFile} from "react-icons/vsc"
import {CiMoneyBill, CiSettings} from "react-icons/ci"
import { BiMessageSquareDetail } from 'react-icons/bi'
import { HiOutlineReceiptRefund } from 'react-icons/hi'

const DashboardSideBar = ({active}) => {
    console.log("active" , active)
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
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
                    Semua Event
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-create-event" className="w-full flex items-center">
                <VscNewFile size={30}  className={`${active === 6 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 6 ? "text-red-400" : "grey"} `}>
                    Membuat Event
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-withdraw-money" className="w-full flex items-center">
                <CiMoneyBill size={30}  className={`${active === 7 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 7 ? "text-red-400" : "grey"} `}>
                    Tarik Uang
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-inbox" className="w-full flex items-center">
                <BiMessageSquareDetail size={30}  className={`${active === 8 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 8 ? "text-red-400" : "grey"} `}>
                    Pesan 
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard/coupons" className="w-full flex items-center">
                <AiOutlineGift size={30}  className={`${active === 9 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 9 ? "text-red-400" : "grey"} `}>
                    Kode Diskon
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-refunds" className="w-full flex items-center">
                <HiOutlineReceiptRefund size={30}  className={`${active === 10 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 10 ? "text-red-400" : "grey"} `}>
                    Refund
                </h5>
            </Link>
        </div>
        <div className="w-full flex items-center p-4">
            <Link to="/dashboard-settings" className="w-full flex items-center">
                <CiSettings size={30}  className={`${active === 11 ? "text-red-400" : "grey"} `}/>
                <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 11 ? "text-red-400" : "grey"} `}>
                    Settings
                </h5>
            </Link>
        </div>
    </div>
  )
}

export default DashboardSideBar