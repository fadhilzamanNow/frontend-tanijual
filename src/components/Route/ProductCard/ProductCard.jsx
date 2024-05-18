import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx"

const ProductCard = ({data}) => {

    const [click,setClick] = useState(false);
    const [open,setOpen] = useState(false);

    const d = data.name;
    const product_name = d.replace(/\s+/g,"-");
  return (
    <>
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="">
            <div className='w-full  flex items-center justify-center'>

            
            <Link to={`/product/${product_name}`}>
                <img src={data.image_Url[0].url} 
                    alt = ""
                    className='w-[170px] h-[170px] object-cover items-center justify-center rounded-md'
                />
            </Link>
            </div>
            <Link to="/">
                <h5 className={`${styles.shop_name} text-[20px]`}>{data.shop.name}</h5>
            </Link>
            <Link to={`/product/${product_name}`}>
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
                           Rp. {data.price === 0 ? (data.price=== 0) : (data.discount_price)}
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.price ? "Rp. " + data.price  : (null)}
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
                    onClick={() => setClick(!click)}
                    color={click ? "red" : "gray"}
                    title='Remove dari Wishlist'
                    />
                ) : (
                    <AiOutlineHeart 
                    className="cursor-pointer absolute right-2 top-5" 
                    onClick={() => setClick(!click)}
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
                onClick={() => setClick(!click)}
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