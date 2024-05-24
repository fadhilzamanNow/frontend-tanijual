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


const ProductDetails = ({data}) => {

    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const navigate = useNavigate()
    const [select,setSelect] = useState(0)
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([]);
    const {wishlist} = useSelector((state) => state.wishlist)
    const {cart} = useSelector((state) => state.cart)

    const dispatch = useDispatch();
    
    useEffect(() => {
        setIsLoading(true)
        console.log("data : ", data?.shopId)
        axios.get(`${server}/product/get-all-products-shop/${data?.shopId}`).then((res) => {
            setProducts(res.data.products)
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
            if(data.stock < count){
                toast.error("Jumlah yang masukkan melebihi stok")
            } else{
                const cartData = {...data, qty : count}
                dispatch(addToCart(cartData));
                toast.success("Produk berhasil ditambahkan")
            }
        }
    }

    
    

    const incrementCount = () => {
        setCount(count + 1);
    }

    const decrementCount = () => {
        setCount(count - 1);
    }

    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=501231231131e")
    }


  return (
    <div className="bg-white">
        {
            data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex pt-5">
                            <div className="w-full flex-col items-center 800px:w-[50%] 800px:flex-col 800px:items-center">
                                <div>
                                <img src={`${backend_url}/${data?.images[select]}`} alt="" className="w-[80%]"/>
                                </div>
                                <div className="w-full flex">
                                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={`${backend_url}/${data?.images[0]}`} alt="" 
                                                className="h-[200px]"
                                                onClick={() => setSelect(0)}
                                            />
                                    </div>
                                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer self-center`}>
                                            <img src={`${backend_url}/${data?.images[1]}`} alt="" 
                                                className="h-[200px]"
                                                onClick={() => setSelect(1)}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full 800px:w-[50%]">
                                <h1 className={`${styles.productTitle}`}>
                                 {data.name}
                                </h1>
                                <p className="text-justify">
                                    {data.description}
                                </p>
                                <h4 className={`${styles.productDiscountPrice}`}>
                                    Rp. {data.discountPrice}
                                </h4>
                                <h3 className={`${styles.price}`}>
                                    {data.originalPrice ? "Rp. " + data.originalPrice : null}
                                </h3>
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

                        <div className={`rounded-xl mt-6 h-11 flex items-center w-[250px] bg-black text-white justify-between`} onClick={() => addToCartHandler(data._id)}>
                            <div className="ml-4">
                                Tambahkan ke Keranjang
                            </div>
                            <div className="mr-4">
                                <AiOutlineShoppingCart />
                            </div>
                        </div> 
                        <div className="flex items-center pt-8">
                            <Link to={`/shop/preview/${data.shop._id}`}>
                            <img src={`${backend_url}/${data?.shop?.avatar}`} alt="" 
                                className="w-[50px] h-[50px] rounded-full mr-2"
                            />
                            </Link>
                            <div>
                            <Link to={`/shop/preview/${data.shop._id}`}>
                            <h3 className={styles.shop_name}>
                                    {data.shop.name}
                                </h3>
                            </Link>
                                <h5 className="pb-3 text-[15px]">
                                    X Rating
                                </h5>
                            </div>
                            <div className="bg-green-400 w-[250px] p-4 rounded-xl items-center flex flex-col ml-3" onClick={handleMessageSubmit}>
                                <h1 className='text-[20px] text-white'>
                                    Tanya Penjual
                                </h1>
                            </div>
                        </div>
                            
                            </div>

                           
                            
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <ProductDetailsInfo data={data} products = {products}/>
                </div>
            ) : 
            (null)
        }
    </div>
  )
}

const ProductDetailsInfo = ({data,products}) => {
    const [active,setActive] = useState(1);

    

    return (
        <div className="bg-white px-3 800px:px-10 py-2 rounded ">
                <div className="w-full flex justify-between border-b pt-10 pb-2">
                    <div className="relative">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(1)} >
                            Detail Produk</h5>
                            {
                                active === 1 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="relative">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(2)} >
                            Review Produk</h5>
                            {
                                active === 2 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(3)} >
                            Informasi Penjual</h5>
                            {
                                active === 3 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                </div>
                {
                    active === 1 ? (
                        <>
                        <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                            {data?.description}
                        </p>
                        
                        </>
                    ) : (null)
                }
                {
                    active === 2 ? (
                        <>
                        <p>
                        Belum ada review
                        </p>
                        
                        </>
                    ) : (null)
                }
                {
                    active === 3 ? (
                        <>
                       <div className="w-full block 800px:flex p-5 h-[50vh]">
                            <div className="w-full 800px:w-[50%] h-[50vh]">
                                <Link to={`/shop/preview/${data.shop._id}`}>
                                <div className="flex items-center pl-3">                
                                    <img src={`${backend_url}/${data?.shop?.avatar}`} alt="" className="w-[50px] h-[50px] rounded-full object-cover" />
                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            X Ratings
                                        </h5>
                                    </div>
                                   
                                </div>
                                </Link>
                                <div className="pt-2">
                                    {data?.shop?.description}
                                    </div>
                                
                            </div>
                            <div className="w-full 800px:w-[50%]">
                                <div className="text-left">
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Bergabung sejak <span className="font-[100]">{data?.shop?.createdAt?.slice(0,10)}</span>
                                    </h5>
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Total Produk yang dijual <span className="font-[100]">{products?.length}</span>
                                    </h5>
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Total Review <span className="font-[100]"> 153</span>
                                    </h5>
                                    <Link to="/">
                                        <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3 items-end`}>
                                            <h4 className="text-white">Cek Toko</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                       </div>
                        
                        </>
                    ) : (null)
                }
        </div>
    )
}

export default ProductDetails