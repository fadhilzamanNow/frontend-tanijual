import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {FiPackage, FiShoppingBag} from "react-icons/fi"
import { BiMessageSquareDetail } from 'react-icons/bi'
import { backend_url } from '../../../server'

const DashboardHeader = () => {
    const {seller} = useSelector((state) => state.seller)
    console.log(seller)
  return (
    <div className="xs:w-full h-[80px] bg-white sticky top-0 z-[99999999] flex items-center justify-between border border-b-gray-400 ">
        <div className="">
            <Link>
                <div className="text-[24px] font-[600] text-green-500 ml-2">Dashboard</div>
            </Link>
        </div>
        <div className="flex items-center">
            <div className='flex items-center mr-4'>
                <Link to="/dashboard-coupons" className="800px:block hidden">
                    <AiOutlineGift 
                        color="green"
                        size={30}
                        className="mx-5 cursor-pointer"
                    />
                </Link>
                <Link to="/dashboard-events" className="800px:block hidden">
                    <MdOutlineLocalOffer
                        color="green"
                        size={30}
                        className="mx-5 cursor-pointer"
                    />
                </Link>
                <Link to="/dashboard-products" className="800px:block hidden">
                    <FiShoppingBag
                        color="green"
                        size={30}
                        className="mx-5 cursor-pointer"
                    />
                </Link>
                <Link to="/dashboard-orders" className="800px:block hidden">
                    <FiPackage 
                        color="green"
                        size={30}
                        className="mx-5 cursor-pointer"
                    />
                </Link>
                <Link to="/dashboard-messages" className="800px:block hidden">
                    <BiMessageSquareDetail 
                        color="green"
                        size={30}
                        className="mx-5 cursor-pointer"
                    />
                </Link>
                {
                    seller ? (
                        <Link to={`/shop/${seller._id}`}>
                        <img src={`${seller?.avatar?.url}`} alt="" 
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        </Link>
                    )  : (null)
                }
                
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader