import React, {useEffect, useState} from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from '../../../server';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import { addToCart } from '../../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';

const ProductDetailsCard = ({data,setOpen}) => {
    const {cart} = useSelector((state) => state.cart)
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const {wishlist} = useSelector((state) => state.wishlist)

    useEffect(() => {
        if(wishlist && wishlist.find((i) => i._id === data._id)){
            setClick(true)
        }else{
            setClick(false)
        }
    })

    const dispatch = useDispatch()
    const handleMessageSubmit = () => {

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
                <div className="fixed w-full h-screen top-0 left-0 bg-[#34dd251c] z-40 flex items-center justify-center">
                    <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                        <RxCross1 size={30} className="absolute right-3 top-3 z-50" onClick={() => setOpen(false)} />
                        <div className="block w-full 800px:flex ">
                            <div className="w-full 800px:w-[50%]  ">
                                <img src={`${data?.images[0]?.url}`} alt="" className="h-[300px] w-[300px] object-cover ml-20 mt-10" />
                                <div className="flex items-center ml-5">
                                    <Link to={`/shop/preview/${data.shop._id} `}>
                                    <img src={`${data?.shop?.avatar.url}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover ml-[65px]'/>
                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data?.shop?.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            
                                        </h5>
                                    </div>
                                    </Link>
                                </div>
                                <div className={`${styles.button} bg-black mt-4 rounded-[4px] h-11 ml-20`} onClick={handleMessageSubmit}>
                                        <span className="text- white flex items-center">
                                            Kirimkan Pesan <AiOutlineMessage className="ml-1 "/>
                                        </span>
                                    </div>
                                    <h5 className="text-[16px] text-red-600 mt-5 ml-20">
                                        X Terjual
                                    </h5>
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5 pl-[px] pr-[5px]">
                                <h1 className={`${styles.productTitle}} text-[20px]`}>
                                    {data?.name}
                                </h1>
                                <p className="text-justify">
                                    {data?.description}
                                </p>
                                <div className="flex pt-3">
                                <h4 className={`${styles.productDiscountPrice}}`}>
                                    Rp. {data?.discountPrice}    
                                </h4> 
                                <h3 className={`${styles.price}`}>
                                    {data?.originalPrice ? "Rp. " + data?.originalPrice : null}
                                </h3>
                             </div>
                             <div className="flex items-center mt-12 justify-between pr-3">
                                <div>
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick ={() => decrementCount()}
                                    >
                                           -
                                    </button>
                                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">{count}</span>
                                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                        onClick = {() => incrementCount()}
                                    >
                                            +
                                    </button>
                                </div>     
                                {click ? (
                                <AiFillHeart 
                                size={30}
                                className="cursor-pointer "   
                                onClick={() => deleteFromWishlistHandler(data)}
                                color={click ? "red" : "gray"}
                                title='Remove dari Wishlist'
                                />
                            ) : (
                                <AiOutlineHeart 
                                className="cursor-pointer " 
                                size={30}
                                onClick={() => addToWishlistHandler(data)}
                                color={click ? "red" : "gray"}
                                title='Tambahkan ke Wishlist'
                                />
                            )}
                            </div>
                            <div className={`${styles.button} text-white mt-6 rounded h-11 flex items-center w-auto`} onClick={() => addToCartHandler(data?._id)} >
                                <span className="text-white flex items-center">
                                    Tambahkan ke keranjang <AiOutlineShoppingCart className="ml-1" />
                                </span>
                            </div>
                            </div>
                           
                           
                        </div>
                        
                    </div>
                </div>
            ) : (null)
        }
    </div>
  )
}

export default ProductDetailsCard