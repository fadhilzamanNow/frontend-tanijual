import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import {IoBagHandleOutline} from "react-icons/io5"
import { Link } from "react-router-dom";
import {BsCartPlus} from "react-icons/bs"
import { AiOutlineHeart } from 'react-icons/ai';
import {removeFromWishlist} from "../../redux/actions/wishlist"
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/actions/cart';
import { Drawer } from "flowbite-react";


const Wishlist = ({setOpenWishlist}) => {

    const {wishlist} = useSelector((state) => state.wishlist)
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data))
    } 
   

    
  return (
    <div className="fixed top-0 left-0 w-full bg-[#fafafa00] h-screen z-[99999999999] ">
        <div className="fixed bottom-0 right-0 min-h-full w-[80%] xl:w-[25%] bg-white flex flex-col justify-between shadow overflow-y-scroll">
           {
            wishlist && wishlist.length === 0  ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                       <RxCross1 
                        size={25}
                        className="cursor-pointer"
                        onClick={() => setOpenWishlist(false)}
                        />
                    </div>
                    <h5>Wishlistmu masih Kosong</h5>
                  </div> 
            ) : (
                <div>

            
                <div className="flex w-full justify-end pt-5 pr-5  z-20">
                    <RxCross1 
                        size={25}
                        className="cursor-pointer"
                        color='black'
                        onClick={() => setOpenWishlist(false)}
                    />
                </div> 

                { /* jumlah barng */ }

                <div className={`${styles.noramlFlex} p-4`}>
                    <AiOutlineHeart 
                        size={25}
                    />
                    <h5 className="pl-2 text-[12px] sm:text-[20px] font-[500]">
                         {wishlist && wishlist.length} yang disukai
                    </h5>
                </div>

                { /* detail barang keranjang */}
                {
                    wishlist && wishlist.map((i,index) => {
                        return (
                            <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} setOpenWishlist={setOpenWishlist}/>
                        )
                    })
                }
            </div>
            )
           }
           
        </div>
            
    </div>
  )
}


const CartSingle = ({data,removeFromWishlistHandler, setOpenWishlist }) => {
    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id)
        if(isItemExists){
            toast.error("Produk sudah ditambahkan ke dalam keranjang !")
        }else{
            if(data.stock < 1){
                toast.error("Jumlah yang masukkan melebihi stok")
            } else{
                const cartData = {...data, qty : 1}
                dispatch(addToCart(cartData));
                toast.success("Produk berhasil ditambahkan")
                setOpenWishlist(false);
            }
        }
    }
    return (
        <div className=" p-4">
            <div className="w-full flex items-center pt-5 pr-5">
            <RxCross1 className="" size={12} onClick={() => removeFromWishlistHandler(data) }/>
                <div className='flex flex-col gap-y-2'>
                    
                    <div>
                        <img src={`${data?.images[0]?.url}`} alt="" className="w-[100px] h-[80px] ml-4 rounded-md object-cover shadow-2xl" />
                    </div>
                     
                        
                       
                </div>
                    <div className="pl-[5px] flex-1">
                        <h1>{data.name}</h1>
                        
                        <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">
                            Rp. {data.originalPrice}
                        </h4>
                    </div>
                    <div>
                    <BsCartPlus size={20} className="cursor-pointer" title="Tambahkan ke Keranjangs" onClick={() => addToCartHandler(data._id)}/>
                    </div>
                
                    
            </div>
        </div>
    )
}

export default Wishlist