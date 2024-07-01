import React, {useEffect, useState} from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url, server } from '../../../server';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import { addToCart } from '../../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { RiStarSFill, RiStarSLine } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Carousel } from 'flowbite-react';
import axios from 'axios';


const ProductDetailsCard = ({data,setOpen,event}) => {

    const navigate = useNavigate()
    const {cart} = useSelector((state) => state.cart)
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const {wishlist} = useSelector((state) => state.wishlist)
    const {user,isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {
        if(wishlist && wishlist.find((i) => i._id === data._id)){
            setClick(true)
        }else{
            setClick(false)
        }
    })

    const dispatch = useDispatch()
    const handleMessageSubmit = async(e) => {
        if(isAuthenticated){
            const groupTitle = data?.shopId + user._id
            const userId = user._id 
            const sellerId = data?.shopId
            await axios.post(`${server}/conversation/create-new-conversation`,{
                groupTitle,userId,sellerId
            }).then((res) => {
                navigate(`/inbox?${res.data.conversation._id}`)
            }).catch((err) => {
                toast.error(`${err.response.data.message}`)
            })
        }else{
            toast.error("Untuk memulai pembicaran, login terlebih dahulu")
        }
    }


     const incrementCount = () => {
        setCount(count => count + 1)
    }

    const decrementCount = () => {
        setCount(count => count - 1 )
    }

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id)
        if(isItemExists){
            toast.error("Produk sudah ditambahkan ke dalam keranjang !")
        }else{
            if(data?.stock < count){
                toast.error("Jumlah yang masukkan melebihi stok")
            } else{
                const cartData = {...data, qty : count}
                dispatch(addToCart(cartData));
                toast.success("Produk berhasil ditambahkan")
            }
        }
    }

    
    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data))
    }

    const deleteFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data))

    }

    
  return (
    <div className="bg-white">
        {
            data ? (
                <div className="fixed w-full h-screen top-0 left-0 bg-[#34dd251c] z-[99999999] flex flex-flow items-center justify-center">
                    <div className="w-[89%] 800px:w-[90%] h-[75vh] overflow-y-scroll 800px:h-[60vh] bg-white rounded-md shadow-sm relative ">
                        <RxCross1 size={20} className="absolute right-3 top-3 z-[999999999999999] text-white hover:text-gray-500 sm:text-black " onClick={() => setOpen(false)} />
                        <div className="block w-full 800px:flex items-center items 800px:mx-4 800px:justify-center">
                            <div className="w-full 800px:w-[50%]  ">
                                
                                        <div className="200px:h-[200px] sm:h-80 w-full md:w-[100%] xl:h-[400px] 2xl:h-[420px]">
                                            <Carousel>
                                            {data?.images?.map((gambar) => {
                                            console.log(gambar?.url)
                                        return  (
                                                <img src={`${gambar?.url}`} alt="" className="h-[200px] sm:h-[300px] xl:h-[380px] 2xl:h-[560px] w-full object-cover md:w-[100%]" />
                                                )
                                        })}
                                            </Carousel>
                                        </div>
                                   
                            </div>
                            <div className="flex flex-col mx-[20px] gap-y-1 !text-[12px] h-[100%]  800px:justify-evenly 800px:w-[40%] " >
                                <div className="flex pt-1">
                                    <h4 className={`${styles.productDiscountPrice}  `}>
                                        Rp. {data?.discountPrice}    
                                    </h4> 
                                    <h3 className={`${styles.price} !text-gray-500`}>
                                        {data?.originalPrice ? "Rp. " + data?.originalPrice : null}
                                    </h3>
                                   {/*  <div>
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick ={() => decrementCount()}
                                    >
                                           -
                                    </button>
                                    <span className="bg-gray-200 text-gray-800 font-medium px-2 py-1">{count}</span>
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick = {() => incrementCount()}
                                    >
                                            +
                                    </button>
                                </div>  */}
                                    
                                </div>
                                <h1 className={`${styles.productTitle}} !text-[16px]`}>
                                    {data?.name}
                                </h1>
                                <p className="text-justify !text-[12px]">
                                    {data?.description}
                                </p>
                                <div className="flex items-center justify-start gap-x-1">
                                    {data?.ratings ? (
                                        <div className="flex items-center  !text-[12px]">
                                        <RiStarSFill className='text-yellow-400' size={15}/>
                                        <span>{data?.ratings}</span>
                                        </div>
                                        
                                    ) : (<>
                                        <RiStarSLine size={20} className="text-yellow-400"/>
                                        </>
                                )}
                                    <div> 
                                    <GoDotFill className="text-black" size={10}/>
                                    </div>
                    <div className="font-[400] text-[12px] sm:text-[12px] text-gray-500 ">
                            {data.sold_out ? data.sold_out + " terjual" : " 0 terjual" }
                        </div>
                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="">
                                            <Link to={`/shop/preview/${data.shopId}`}>
                                                <img src={data?.shop?.avatar?.url} alt="" className='h-[30px] w-[30px] rounded'/>
                                            </Link>
                                        </div>
                                        <div className="text-center !text-[12px]">
                                            <Link to={`/shop/preview/${data.shopId}`}>
                                            {data?.shop?.name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2 font-[600] hover:text-gray-500"  onClick={handleMessageSubmit}>
                                        Tanya Penjual <IoChatbubbleEllipsesOutline className='text-black text-[12px]' />
 
                                    </div>
                                </div>
                                <div className='block 800px:hidden'>
                                <div className={`${styles.button} text-white rounded !h-[40px] flex items-center w-auto`} onClick={() => addToCartHandler(data?._id)} >
                                <span className="text-white flex items-center">
                                    Tambahkan ke keranjang <AiOutlineShoppingCart className="ml-1" />
                                </span>
                            </div>
                            {
                                click ? (<div className={`${styles.button} !bg-white !text-green-500  rounded !h-[40px] flex items-center w-auto border border-green-500 !p-2`} onClick={() => deleteFromWishlistHandler(data)} >
                                <span className=" flex items-center">
                                    Hapus dari Wishlist <AiOutlineHeart className="ml-1" />
                                </span>
                            </div>) : (
                                <div className={`${styles.button} !bg-white !text-green-500  rounded !h-[40px] flex items-center w-auto border border-green-500 `} onClick={() => addToWishlistHandler(data)} >
                                <span className=" flex items-center">
                                    Tambahkan ke Wishlist <AiOutlineHeart className="ml-1" />
                                </span>
                            </div>
                            )
                            }
                                </div>
                                
                            
                               
                            </div>
                           
                           
                           
                        </div>
                        <div className='200px:hidden 800px:block 800px:mx-4'>
                                <div className={`${styles.button} text-white rounded !h-[40px] flex items-center w-auto`} onClick={() => addToCartHandler(data?._id)} >
                                <span className="text-white flex items-center">
                                    Tambahkan ke keranjang <AiOutlineShoppingCart className="ml-1" />
                                </span>
                            </div>
                            {
                                click ? (<div className={`${styles.button} !bg-white !text-green-500  rounded !h-[40px] flex items-center w-auto border border-green-500 !p-2`} onClick={() => deleteFromWishlistHandler(data)} >
                                <span className=" flex items-center">
                                    Hapus dari Wishlist <AiOutlineHeart className="ml-1" />
                                </span>
                            </div>) : (
                                <div className={`${styles.button} !bg-white !text-green-500  rounded !h-[40px] flex items-center w-auto border border-green-500 `} onClick={() => addToWishlistHandler(data)} >
                                <span className=" flex items-center">
                                    Tambahkan ke Wishlist <AiOutlineHeart className="ml-1" />
                                </span>
                            </div>
                            )
                            }
                                </div>
                        
                    </div>
                </div>
            ) : (null)
        }
    </div>
  )
}

export default ProductDetailsCard