import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url, server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllProductsShop } from '../../redux/actions/product';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist';
import { addToCart } from '../../redux/actions/cart';
import Ratings from './Ratings';
import { Carousel } from 'flowbite-react';
import { MdStar } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { TiStarFullOutline } from "react-icons/ti";
import { IoChatboxEllipsesOutline } from "react-icons/io5";







const ProductDetails = ({data}) => {

    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const navigate = useNavigate()
    const [select,setSelect] = useState(0)
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([]);
    const {wishlist} = useSelector((state) => state.wishlist)
    const {cart} = useSelector((state) => state.cart)
    const {user,isAuthenticated} = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const [active,setActive] = useState(1);

    
    
    
    useEffect(() => {
        setIsLoading(true)
        console.log("data : ", data?.shopId)
        axios.get(`${server}/product/get-all-products-shop/${data?.shopId}`).then((res) => {
            setProducts(res?.data?.products)
        }).catch((err) => {
            console.log(err)
        })

        if(wishlist && wishlist.find((i) => i._id === data?._id)){
            setClick(true);
        }else{
            setClick(false);
        }
        
    },[data,wishlist])

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data))
    }

    const deleteFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data))

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

    console.log("data adalah : ", data);
    

    const incrementCount = () => {
        setCount(count + 1);
    }

    const decrementCount = () => {
        setCount(count - 1);
    }

    console.log("data adalah : ", data)
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


    const totalReviewsLength = products && products.reduce((acc,product) => {
        return acc + product.reviews.length
},0)

    const totalRatings = products && products.reduce((acc,product) => {
        return acc + product.reviews.reduce((sum,review) => {
            return sum + review.rating
        },0)
    },0)

    const averageRating = totalRatings / totalReviewsLength || 0;

    const potongan = (100 * data?.discountPrice / data?.originalPrice).toFixed(0)

    
  return (
    <div className="">
        {
            data ? (
                <div className={`${styles.section} w-[100%] 800px:w-[80%] rounded relative xl:w-[100%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full  pt-5">
                            <div className="block xl:flex bg-white xl:mx-80 xl:justify-around pb-2">
                                {/* tampilan mobile dan web bagian kiri */}
                                <div className=" rounded p-2 xl:w-[35%] ">                       
                                    <div className="200px:h-48 w-full xl:h-[300px] xl:w-[100%] xl:gap-x-5 ">
                                        <Carousel>
                                            {data?.images?.map((gambar) => {
                                                return (
                                                    <img src={gambar?.url} className="w-full h-full"/>
                                                )
                                            })
                                            }
                                        </Carousel>
                                    </div>
                                <div>
                                {/* tampilan mobile */}
                                <div className="block xl:hidden">

                                
                                    <div className="flex items-center">
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            Rp. {data?.discountPrice}
                                        </h4>
                                        <h3 className={`${styles.price} !text-gray-500 !text-[12px]`}>
                                            {data?.originalPrice ? "Rp. " + data?.originalPrice : null}
                                        </h3>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <h1 className={``}>
                                        {data?.name}
                                        </h1>
                                        <div>
                                            {click ? (
                                            <AiFillHeart
                                            size={18}
                                            className="cursor-pointer " 
                                            onClick={() => deleteFromWishlistHandler(data)}
                                            color={click ? "red" : "gray"}
                                            title='Remove dari Wishlist'
                                            />
                                        ) : (
                                            <AiOutlineHeart 
                                            className="cursor-pointer " 
                                            size={18}
                                            onClick={() => addToWishlistHandler(data)}
                                            color={click ? "red" : "gray"}
                                            title='Tambahkan ke Wishlist'
                                            />
                                        )}
                                    </div>
                                    </div>
                                    
                                    <div className="flex items-center w-[35%] justify-between">
                                        <div className="text-[12px]">
                                            {data?.sold_out ? (`Terjual ${data?.sold_out}`) : ("Belum terjual")}
                                        </div>
                                        <div>
                                        {data?.ratings ? (
                                            <div className="flex items-center border border-gray-500 rounded p-[2px] ">
                                                <MdStar className="text-yellow-300"/>
                                                <div className="text-[12px]">
                                                    {data?.ratings}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center border border-gray-500 rounded p-[2px]">
                                                <FaRegStar className="text-yellow-300"/>
                                                <div>
                                                    0
                                                </div>
                                            </div>
                                        )}
                                        </div>
                                        <div className="text-[12px] text-black flex items-center border border-gray-500 p-[2px] rounded">
                                            <HiOutlineChatAlt2 /> 
                                            <div>
                                                {data?.reviews?.length > 0 ? (data?.reviews?.length) : ("0")}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                </div>
                                </div>

                                    {/* tampilan web buat bagian tengah*/}
                                <div className="w-[30%] xl:flex flex-col hidden">
                                    <div className="text-[32px] font-[700] text-wrap">
                                        {data?.name}
                                    </div>
                                    <div className="flex items-center w-[35%] gap-x-5">
                                        <div className="text-[12px]">
                                            {data?.sold_out ? (`Terjual ${data?.sold_out}`) : ("Belum terjual")}
                                        </div>
                                        <div className="flex gap-x-2">
                                            {data?.ratings ? (
                                                <div className="flex items-center border border-gray-500 rounded p-[2px] ">
                                                    <MdStar className="text-yellow-300"/>
                                                    <div className="text-[12px]">
                                                        {data?.ratings}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center border border-gray-500 rounded p-[2px]">
                                                    <FaRegStar className="text-yellow-300"/>
                                                    <div>
                                                        0
                                                    </div>
                                                </div>
                                            )}
                                            <div className="text-[12px] text-black flex items-center border border-gray-500 p-[2px] rounded">
                                                <HiOutlineChatAlt2 /> 
                                                <div>
                                                    {data?.reviews?.length > 0 ? (data?.reviews?.length) : ("0")}
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="flex text-[28px] font-[700] items-center gap-x-5">
                                        <div>
                                            Rp. {data?.discountPrice}
                                        </div>
                                        
                                    </div>
                                    <div className="flex gap-x-3 mb-2">
                                        <div className="text-white font-[600] text-[12px] py-2 px-2 bg-red-600 w-max rounded-md h-max">
                                            -{potongan}%
                                        </div>
                                        <div className={` !mt-0 !text-gray-500 line-through text-[20px] font-[200]`}>
                                                Rp. {data?.originalPrice} 
                                        </div>
                                    </div>
                                    

                                    <div className="flex gap-x-2 border-b border-b-gray-500 border-t border-t-gray-500 py-2">
                                        <div className={`relative ${active === 1 ? ("text-green-500") : ("text-gray-500")} cursor-pointer `} onClick={() => setActive(1)}>
                                            Detail
                                            <div className={`${styles.active_indicator} !bg-green-500 h-[10px] ${active === 1 ? (null) : ("hidden")} `}>
                                            </div>
                                        </div>
                                        <div className={`relative ${active === 2 ? ("text-green-500") : ("text-gray-500")} cursor-pointer `} onClick={() => setActive(2)}>
                                            Informasi Toko 
                                            <div className={`${styles.active_indicator} !bg-green-500 h-[10px] ${active === 2 ? (null) : ("hidden") } `}>
                                            </div>
                                        </div>
                                        <div className={`relative ${active === 3 ? ("text-green-500") : ("text-gray-500")} cursor-pointer `} onClick={() => setActive(3)}>
                                            Review 
                                            <div className={`${styles.active_indicator} !bg-green-500 h-[10px] ${active === 3 ? (null) : ("hidden") } `}>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {active === 1 ? (
                                            <div className="flex flex-col mt-2 border-b ">
                                                <div className="text-gray-500">
                                                    Min. Pembelian : <span className="text-black font-[600]">1</span>   
                                                </div>
                                                <div className="text-gray-500">
                                                    Kategori : <span className="text-black font-[600]">{data?.category}</span>   
                                                </div>
                                                <div className="border-b border-b-gray-400 pb-2">
                                                    <div className="font-[600] mt-2">
                                                        DESKRIPSI PRODUK
                                                    </div>
                                                    <div className="text-justify text-gray-500 text-[14px]">
                                                        {data?.description}
                                                    </div>
                                                </div>
                                                <div className="font-[600]">
                                                    PENGIRIMAN
                                                </div>
                                                <div className="flex text-gray-500 text-[13px] justify-between">
                                                    <div>
                                                        <img src={`${require("../../Assests/Product/icons8-warning-96.png")}`} alt="" className="h-[20px] w-[20px]"/>
                                                    </div>
                                                    <div>
                                                    Informasi Pengiriman akan langsung diserahkan oleh Penjual
                                                    </div>
                                                    
                                                </div>
                                                <div className="text-gray-500 text-[13px] text-justify mt-2">
                                                        Selalu Tanyakan Pengiriman secara berkala Kepada Penjual agar terhindar dari hal yang tidak diinginkan
                                                </div>
                                                
                                                
                                            </div>
                                        ) : (null)}
                                        {
                                            active === 2 ? (
                                                <div>
                                                    <div className="flex mt-2 items-center ">
                                                    <div>
                                                        <Link to={`/shop/preview/${data.shopId}`}>
                                                        <img src={data?.shop?.avatar?.url} alt="" className="h-[75px] w-[75px] rounded-full" />
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <div className="font-[600] flex">
                                                            <Link to={`/shop/preview/${data.shopId}`}>
                                                            {data?.shop?.name.toUpperCase()}
                                                            </Link>
                                                        </div>
                                                      
                                                        <div className="text-gray-400 text-[12px]">
                                                            {data?.shop?.address}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-[600]">
                                                        DESKRIPSI TOKO
                                                    </div>
                                                    <div>
                                                        {data?.shop?.description}
                                                    </div>
                                                    <div className="font-[600]">
                                                        Bergabung Sejak : <span className="font-[200]">{data?.shop?.createdAt?.slice(0,10)}</span>
                                                    </div>
                                                    <div className="font-[600]">
                                                        Total Produk yang Dijual :  <span className="font-[200]">{products?.length}</span>
                                                    </div>
                                                    <div className="font-[600]">
                                                        Tolta Review :  <span className="font-[200]">{totalReviewsLength}</span>
                                                    </div>
                                                </div>
                                                </div>
                                            ) : (null)
                                        }
                                        {
                                            active === 3 ? (
                                                <div>
                                                    {
                            data && data?.reviews.map((item,index) => {
                               
                                return (
                                    <div className="w-full flex my-2 justify-center   ">
                                        <div className="w-full flex  items-center">
                                            <div>
                                                <FotoProfil user={item?.user?._id}  />    
                                            </div>
                                            <div>
                                                <h1 className="pl-3 font-[600] text-[14px] xl:text-[16px]">{item?.user?.name}</h1>
                                                <p className="pl-3 text-[12px]">
                                                {item?.comment}
                                                </p>
                
                                                <Ratings rating = {item?.rating}/>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                )
                            })
                        }
                        {
                            data && data?.reviews.length === 0 && (
                                <h5>Belum ada review untuk produk ini   </h5>
                            )
                        }
                                                </div>
                                            ) : (null)
                                        }
                                    </div>
                                </div>
                                        {/* tampilan web buat bagian kanan */}
                                <div className="w-auto xl:flex flex-col hidden border-green-500 border rounded-lg gap-y-5 p-4 h-max">

                                    <div className="text-[20px] font-[600] mx-2">
                                        Atur jumlah Barang
                                    </div>
                                    
                                    <div className="flex justify-between items-center">                                   
                                        <div className="flex  items-center border border-gray-500 bg-white p-2 rounded text-[12px] h-[4vh] text-green-500 w-[100px] justify-between mx-2">
                                            <div className="text-[20px]" onClick={() => decrementCount()}>
                                                -
                                            </div>
                                            <div className="text-gray-500">
                                                {count}
                                            </div>
                                            <div className="text-[20px]" onClick={() => incrementCount()}>
                                                +
                                            </div>
                                        </div>
                                        <div className="font-[600]">
                                            <span className="">Stok Tersisa : </span>  {data?.stock}
                                        </div>
                                    </div>
                                    <div className='flex justify-between text-gray-500 items-center '>
                                        <div>
                                            Total
                                        </div> 
                                        <div className="font-[600] !text-black">
                                            Rp. {(data?.discountPrice * count)}
                                        </div>
                                    </div>
                                    <div className="bg-green-500 text-white p-2 rounded text-center font-[600] cursor-pointer" onClick={() => addToCartHandler(data._id)}>
                                        + Keranjang
                                    </div>
                                    <div className="flex justify-evenly items-center text-gray-500 text-[14px] cursor-pointer">
                                        <div className="flex items-center gap-x-2" onClick={() => handleMessageSubmit()}>
                                            <IoChatboxEllipsesOutline size={12}/>
                                            <div>
                                                Chat
                                            </div>
                                        </div>
                                        <div>
                                            |
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                                <div>
                                                    {click ? (
                                                    <AiFillHeart
                                                    size={12}
                                                    className="cursor-pointer " 
                                                    onClick={() => deleteFromWishlistHandler(data)}
                                                    color={click ? "red" : "gray"}
                                                    title='Remove dari Wishlist'
                                                    />
                                                ) : (
                                                    <AiOutlineHeart 
                                                    className="cursor-pointer " 
                                                    size={12}
                                                    onClick={() => addToWishlistHandler(data)}
                                                    color={click ? "red" : "gray"}
                                                    title='Tambahkan ke Wishlist'
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                Wishlist
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                

                            </div>
                            <div className="mt-2 bg-white flex items-center rounded gap-x-[10px] xl:hidden">
                                    <div className="">
                                    <Link to={`/shop/preview/${data.shopId}`}>
                                      <img src={data?.shop?.avatar?.url} alt="" className="h-[40px] w-[40px]"/>   
                                    </Link>
                                    </div>
                                    <div className="block">
                                        <div className="font-[500]">
                                            <Link to={`/shop/preview/${data.shopId}`}>
                                                {data?.shop?.name.toUpperCase()}
                                            </Link>
                                        </div>
                                        <div className="text-[12px]">
                                            {data?.shop?.address?.slice(0,20)}
                                        </div>
                                    </div>
                                </div>
                            <div className="flex flex-col gap-y-2 mt-2 bg-white rounded py-3 xl:hidden">
                                <div className="font-[600] mx-2 ">
                                    DESKRIPSI PRODUK
                                </div>
                                <p className="text-justify mx-2">
                                    {data?.description}
                                </p>
                            </div>
                           {/*  <div className="w-full 800px:w-[50%]">
                              
                                
                                
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
                            

                            
                        </div> 

                        <div className={`rounded-xl mt-6 h-11 flex items-center w-[250px] bg-black text-white justify-between`} onClick={() => addToCartHandler(data?._id)}>
                            <div className="ml-4">
                                Tambahkan ke Keranjang
                            </div>
                            <div className="mr-4">
                                <AiOutlineShoppingCart />
                            </div>
                        </div> 
                        <div className="flex items-center pt-8">
                            <Link to={`/shop/preview/${data?.shop._id}`}>
                            <img src={`${data?.shop?.avatar?.url}`} alt="" 
                                className="w-[50px] h-[50px] rounded-full mr-2"
                            />
                            </Link>
                            <div>
                            <Link to={`/shop/preview/${data.shop._id}`}>
                            <h3 className={styles.shop_name}>
                                    {data?.shop?.name}
                                </h3>
                            </Link>
                                <h5 className="pb-3 text-[15px]">
                                    {averageRating} / 5 Rating
                                </h5>
                            </div>
                            <div className="bg-green-400 w-[250px] p-4 rounded-xl items-center flex flex-col ml-3" onClick={handleMessageSubmit}>
                                <h1 className='text-[20px] text-white'>
                                    Tanya Penjual
                                </h1>
                            </div>
                        </div>
                            
                            </div> */}

                           
                            
                        </div>
                    </div>
                    
                    
                    <ProductDetailsInfo data={data} products = {products} totalReviewsLength = {totalReviewsLength} averageRating = {averageRating} />
                    
                </div>
            ) : 
            (null)
        }
       
    </div>
  )
}

const ProductDetailsInfo = ({data,products, totalReviewsLength,averageRating}) => {
    const [active,setActive] = useState(1);

    

    return (
        <div className="bg-white px-3 800px:px-10 py-2 rounded min-h-[30vh] xl:hidden ">
                <div className="w-full flex justify-between border-b pt-10 pb-2  ">
                    <div className="relative">
                        <h5 className={`text-black text-[14px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(1)} >
                            Detail Produk</h5>
                            {
                                active === 1 ? (
                                    <div className={`${styles.active_indicator} !bg-green-500`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="relative">
                        <h5 className={`text-black text-[14px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(2)} >
                            Review Produk</h5>
                            {
                                active === 2 ? (
                                    <div className={`${styles.active_indicator} !bg-green-500`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="relative">
                        <h5 className={`text-black text-[14px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(3)} >
                            Informasi Penjual</h5>
                            {
                                active === 3 ? (
                                    <div className={`${styles.active_indicator} !bg-green-500`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                </div>
                {
                    active === 1 ? (
                        <div className="flex flex-col ">
                        
                        <p className="py-2 text-[12px] leading-8 pb-10 whitespace-pre-line  text-justify">
                            {data?.description}
                        </p>
                        
                        </div>
                    ) : (null)
                }
                {
                    active === 2 ? (
                       <div className = "w-full mt-3  flex flex-col items-center overflow-y-scroll ">
                        {
                            data && data?.reviews.map((item,index) => {
                               
                                return (
                                    <div className="w-full flex my-2 items-center">
                                        <img src={`${item?.user?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full" />
                                        <div>
                                            <h1 className="pl-3 font-[600] text-[14px]">{item?.user?.name}</h1>
                                            <p className="pl-3 text-[12px]">
                                            {item?.comment}
                                            </p>
            
                                            <Ratings rating = {item?.rating}/>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        {
                            data && data?.reviews.length === 0 && (
                                <h5>Belum ada review untuk produk ini   </h5>
                            )
                        }
                       </div>
                    ) : (null)
                }
                {
                    active === 3 ? (
                        <>
                       <div className="w-full block 800px:flex ">
                            <div className="w-full 800px:w-[50%] mx-2">
                                <Link to={`/shop/preview/${data?.shop._id}`}>
                                <div className="flex items-center ">      
                                    <div>
                                        <img src={`${data?.shop?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full object-cover" />    
                                    </div>          
                                    <div >
                                        <h3 className={`text-[14px] font-[600]`}>
                                            {data?.shop?.name}
                                        </h3>
                                        <h5 className=' text-[12px] flex items-center gap-x-1'>
                                            {averageRating} <TiStarFullOutline className="text-yellow-300"/>
                                        </h5>
                                    </div>
                            
                                   
                                </div>
                                </Link>
                                <div className="pt-2 text-[12px]">
                                    <div className="text-[14px] font-[600]">
                                        DESKRIPSI TOKO
                                    </div>
                                        {data?.shop?.description}
                                </div>
                                
                                
                            </div>
                            <div className="200px:w-full 800px:w-[50%] mx-2 mt-4">
                                
                                <div className="text-left text-[14px]">
                                    <h5 className="font-[600]  800px:mt-0 800px:flex flex-col items-end">
                                        Bergabung sejak : <span className="font-[100] text-[12px]">{data?.shop?.createdAt?.slice(0,10)}</span>
                                    </h5>
                                    <h5 className="font-[600] 800px:mt-0 800px:flex flex-col items-end">
                                        Total Produk yang dijual : <span className="font-[100] text-[12px]">{products?.length}</span>
                                    </h5>
                                    <h5 className="font-[600]  800px:mt-0 800px:flex flex-col items-end">
                                        Total Review : <span className="font-[100] text-[12px]">{totalReviewsLength}</span>
                                    </h5>
                                    
                                </div>
                            </div>
                       </div>
                       
                        
                        </>
                    ) : (null)
                }
        </div>
    )
}


const FotoProfil = ({user}) => {
    const [gambar,setGambar] = useState();
    console.log("id user", user);

    useEffect(() => {
        axios.get(`${server}/user/user-info/${user}`).then((res) => {
            console.log("hasil :" ,res?.data?.user?.avatar?.url)
            setGambar(res?.data?.user?.avatar?.url)
        }).catch((err) => {
            console.log("error :", err )
        })
    },[])
    return (
        <div>
            <img src={`${gambar}`} alt="" className="xl:w-[50px] xl:h-[50px] rounded-full" />
        </div>
    )
}
export default ProductDetails