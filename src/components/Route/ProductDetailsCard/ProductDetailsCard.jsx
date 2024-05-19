import React, {useState} from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetailsCard = ({data,setOpen}) => {
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);

    const handleMessageSubmit = () => {

    }

     const incrementCount = () => {
        setCount(count => count + 1)
    }

    const decrementCount = () => {
        setCount(count => count + 1 )
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
                                <img src={data.image_Url[0].url} alt="" className="h-[300px] w-[300px] object-cover ml-20 mt-10" />
                                <div className="flex items-center ml-5">
                                    <img src={data.shop.shop_avatar.url} alt="" className='w-[50px] h-[50px] rounded-full object-cover ml-[65px]'/>
                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            ({data.shop.ratings}) Ratings
                                        </h5>
                                    </div>
                                    
                                </div>
                                <div className={`${styles.button} bg-black mt-4 rounded-[4px] h-11 ml-20`} onClick={handleMessageSubmit}>
                                        <span className="text- white flex items-center">
                                            Kirimkan Pesan <AiOutlineMessage className="ml-1 "/>
                                        </span>
                                    </div>
                                    <h5 className="text-[16px] text-red-600 mt-5 ml-20">
                                        ({data.total_sell}) Terjual
                                    </h5>
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5 pl-[px] pr-[5px]">
                                <h1 className={`${styles.productTitle}} text-[20px]`}>
                                    {data.name}
                                </h1>
                                <p className="text-justify">
                                    {data.description}
                                </p>
                                <div className="flex pt-3">
                                <h4 className={`${styles.productDiscountPrice}}`}>
                                    Rp .{data.discount_price}    
                                </h4> 
                                <h3 className={`${styles.price}`}>
                                    {data.price ? "Rp. " + data.price : null}
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
                                onClick={() => setClick(!click)}
                                color={click ? "red" : "gray"}
                                title='Remove dari Wishlist'
                                />
                            ) : (
                                <AiOutlineHeart 
                                className="cursor-pointer " 
                                size={30}
                                onClick={() => setClick(!click)}
                                color={click ? "red" : "gray"}
                                title='Tambahkan ke Wishlist'
                                />
                            )}
                            </div>
                            <div className={`${styles.button} text-white mt-6 rounded h-11 flex items-center w-auto`}>
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