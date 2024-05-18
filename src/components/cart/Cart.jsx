import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import {IoBagHandleOutline} from "react-icons/io5"
import {HiMinus, HiPlus} from "react-icons/hi"
import { Link } from "react-router-dom";


const Cart = ({setOpenCart}) => {


    const cartData = [
        {
            name : "Pisang",
            description : "Pisang terbaik di Jawa Barat",
            harga : 12000,
            gambar : "https://akcdn.detik.net.id/visual/2015/01/06/3145081d-6a92-4c32-a8d6-065203f5097c_169.jpg?w=400&q=90"
        },
        {
            name : "Apel",
            description : "Pisang terbaik di Jawa Barat",
            harga : 15000,
            gambar : "https://asset.kompas.com/crops/smfd25xgXRE3HpMLb2aamPeulYM=/21x0:1476x970/1200x800/data/photo/2022/08/30/630d7ae5d041f.jpg"
        },
        {
            name : "Sayur",
            description : "Pisang terbaik di Jawa Barat",
            harga : 16000,
            gambar  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cnLXvJR4MuxFgg4ktMx6f3MALRmF3WuHkZvQAmrBWA&s"
        }
    ]
  return (
    <div className="fixed top-0 left-0 w-full bg-[#fafafa00] h-screen z-10">
        <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow">
            <div>

            
                <div className="flex w-full justify-end pt-5 pr-5  z-20">
                    <RxCross1 
                        size={25}
                        className="cursor-pointer"
                        color='black'
                        onClick={() => setOpenCart(false)}
                    />
                </div> 

                { /* jumlah barng */ }

                <div className={`${styles.noramlFlex} p-4`}>
                    <IoBagHandleOutline 
                        size={25}
                    />
                    <h5 className="pl-2 text-[20px] font-[500]">
                        {cartData.length} barang
                    </h5>
                </div>

                { /* detail barang keranjang */}
                {
                    cartData && cartData.map((i,index) => {
                        return (
                            <CartSingle key={index} data={i} />
                        )
                    })
                }
            </div>
            <div>
                <Link to="/checkout">
                    <div className="h-[45px] flex items-center justify-center w-[100%] bg-red-500 rounded-[5px]">
                        <h1 className="text-white text-[18px] font-[600]">
                            Checkout Sekarang
                        </h1>
                    </div>
                </Link>
            </div>
        </div>
            
    </div>
  )
}


const CartSingle = ({data}) => {
    const [value,setValue] = useState(1);
    const totalPrice = data.price * value;
    return (
        <div className=" p-4">
            <div className="w-full flex items-center">
                <div className='flex flex-col gap-y-2'>
                        
                        <div className={`bg-green-400 border border-green-500 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`} onClick={() => setValue(value + 1)} >
                            <HiPlus size={18} color="white" />
                        </div>
                        <div className='ml-2'>
                            {value}
                        </div>
                        <div className={`bg-white border border-green-100 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`} onClick={() => setValue(value === 1 ? 1 : value - 1)} >
                            <HiMinus size={18} color="black" />
                        </div>
                </div>
                <div>
                    <img src={data.gambar} alt="" className="w-[100px] h-[80px] ml-2 rounded-md object-cover shadow-2xl" />
                </div>
                <div className="ml-5 justify-between items-center w-full">
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000081]'>Rp. {data.harga} * {value} </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">
                        Rp. {data.harga * value}
                    </h4>
                </div>
                    <div>
                        <RxCross1  
                            size={12}
                            className='cursor-pointer'
                        />
                    </div>
            </div>
        </div>
    )
}

export default Cart