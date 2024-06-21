import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import {MdOutlineTrackChanges} from "react-icons/md"
import {TbAddressBook} from "react-icons/tb"
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'

const ProfileSideBar = ({active,setActive}) => {

    const navigate = useNavigate()


    const logoutHandler = () => {
        axios.get(`${server}/user/logout`,{withCredentials : true}).then((res) => {
            window.location.reload(true)
            toast.success(res.data.message)
        })
        
        navigate("/login")
    }
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(1)}>
            <RxPerson size={20} color={active ===1 ? "red" : ""} />
            <span className={`pl-3 ${active === 1 ? "text-red-400" : ""} 800px:block hidden`}>Profil</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(2)}>
            <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
            <span className={`pl-3 ${active === 2 ? "text-red-400" : ""} 800px:block hidden`}>Pesanan</span>
        </div>
        {/* <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(3)}>
            <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
            <span className={`pl-3 ${active === 3 ? "text-red-400" : ""} 800px:block hidden`}>Pengembalian</span>
        </div> */}
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(4) || navigate("/inbox")}>
            <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
            <span className={`pl-3 ${active === 4 ? "text-red-400" : ""} 800px:block hidden`}>Inbox</span>
        </div>
       {/*  <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(5)}>
            <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
            <span className={`pl-3 ${active === 5 ? "text-red-400" : ""} 800px:block hidden`}>Lacak Barang</span>
        </div> */}
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(6)}>
            <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
            <span className={`pl-3 ${active === 6 ? "text-red-400" : ""} 800px:block hidden`}>Ganti Password</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
            <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
            <span className={`pl-3 ${active === 7 ? "text-red-400" : ""} 800px:block hidden`}>Alamat</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(8) || logoutHandler()} >
            <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
            <span className={`pl-3 ${active === 8 ? "text-red-400" : ""} 800px:block hidden`}>Keluar</span>
        </div>
        
    </div>
  )
}

export default ProfileSideBar