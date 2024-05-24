import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx"
import { backend_url } from '../../../server.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist.js';
import { toast } from 'react-toastify';
import { addToCart } from '../../../redux/actions/cart.js';

const ProductCard = ({data}) => {

    const [click,setClick] = useState(false);
    const [open,setOpen] = useState(false);
    const {cart} = useSelector((state) => state.cart)

    const d = data.name;
    const product_name = d.replace(/\s+/g,"-");
    console.log("berhasil masuk sini")

    const dispatch = useDispatch()

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
            if(data.stock < 1){
                toast.error("Jumlah yang masukkan melebihi stok")
            } else{
                const cartData = {...data, qty : 1}
                dispatch(addToCart(cartData));
                toast.success("Produk berhasil ditambahkan")
            }
        }
    }

    const {wishlist} = useSelector((state) => state.wishlist)

    useEffect(() => {
        if(wishlist && wishlist.find((i) => i._id === data._id )){
            setClick(true);
        }else{
            setClick(false);
        }
    },[wishlist])

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${data._id}`)
        
    }

  return (
    <>
    {/* <div>
        
        <img src={`${backend_url}/${data?.images[0]}`} alt="" className="w-[100px] h-[100px] rounded-full object-contain" />
    </div> */}
    <div className="w-full h-[370px] bg-white rounded-lg  p-3 relative cursor-pointer shadow-2xl">
        <div className="">
            <div className='w-full  flex items-center justify-center'>

            
            
                <img src={`${backend_url}/${data?.images[0]}`} 
                    alt = ""
                    className='w-[170px] h-[170px] object-cover items-center justify-center rounded-md shadow-sm'
                    onClick={() => handleClick()}
                />
            
            </div>  
            <Link to={`/shop/preview/${data.shopId}`}>
                <h5 className={`${styles.shop_name} text-[20px]`}>{data.shop.name}</h5>
            </Link>
            <Link to={`/product/${data._id}`}>
                <h4 className="pb-3 font-[500] text-justify ">
                    {data.name.length > 49 ? data.name.slice(0, 40) + "..." : data.name }
                </h4>
                <div className= "flex self-end text-yellow-400">
                <AiFillStar className="mr-2 cursor-pointer" size={20}/>
                <AiFillStar className="mr-2 cursor-pointer" size={20}/>
                <AiFillStar className="mr-2 cursor-pointer" size={20}/>
                <AiFillStar className="mr-2 cursor-pointer" size={20}/>
                <AiOutlineStar className="mr-2 cursor-pointer" size={20}/>
                </div>
                <div className="py-2 flex items-center justify-between">
                    <div className="flex">
                        <h5 className={`${styles.productDiscountPrice}`}>
                           Rp. {data.discountPrice}
                        </h5>
                        <h4 className={`${styles.price}`}>
                            Rp. {data.originalPrice}
                        </h4>
                        
                    </div>
                    <span className="font-[400] text-[17px] text-green-500">
                            {data.total_sell ? data.total_sell + " terjual" : null }
                        </span>
                </div>
                </Link>
                {/* opsi samping */}

                {click ? (
                    <AiFillHeart 
                    size={22}
                    className="cursor-pointer absolute right-2 top-5" 
                    onClick={() => deleteFromWishlistHandler(data)}
                    color={click ? "red" : "gray"}
                    title='Remove dari Wishlist'
                    />
                ) : (
                    <AiOutlineHeart 
                    className="cursor-pointer absolute right-2 top-5" 
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "red" : "gray"}
                    title='Tambahkan ke Wishlist'
                    />
                )}
                
                <AiOutlineEye 
                size={22}
                className="cursor-pointer absolute right-2 top-14" 
                onClick={() => setOpen(!open)}
                color="gray"
                title="Melihat Detail"
                />
                
                <AiOutlineShoppingCart 
                className="cursor-pointer absolute right-2 top-24" 
                onClick={() => addToCartHandler(data._id)}
                color="gray"
                title='Tambahkan ke Keranjang'
                />
               
                {open ? <ProductDetailsCard setOpen={setOpen} data={data} />
                 : null
                }
            


        </div>
    </div>
    </>
  )
}

export default ProductCard