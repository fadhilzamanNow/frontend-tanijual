import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import {IoBagHandleOutline} from "react-icons/io5"
import {HiMinus, HiPlus} from "react-icons/hi"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { backend_url } from '../../server'
import { addToCart, removeFromCart } from '../../redux/actions/cart'
import { toast } from 'react-toastify'


const Cart = ({setOpenCart}) => {

    const {cart} = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    }

    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data))
    }

   
    

    const totalPrice = cart.reduce((acc,item) => acc + item.qty * item.discountPrice, 0)
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#fafafa00] h-screen z-[99999999999]">
        <div className="fixed top-0 right-0 min-h-full w-[80%] xl:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-y-scroll">
            {
                cart && cart.length === 0 ?  (
                    <div className="w-full h-screen flex items-center justify-center">
                    <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                       <RxCross1 
                        size={25}
                        className="cursor-pointer"
                        onClick={() => setOpenCart(false)}
                        />
                    </div>
                    <h5>Keranjangmu masih Kosong</h5>
                  </div> 
                ) : (
                    <div className='bg-white '>

            
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
                                {cart.length} barang
                            </h5>
                        </div>
    
                        { /* detail barang keranjang */}
                        <div className="overflow-y-scroll h-[70vh] sm:h-[80vh]">                        
                        {
                            cart && cart.map((i,index) => {
                                return (
                                    <CartSingle key={index} data={i} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler}  />
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
           
            <div>
                <Link to="/checkout">
                    <div className="h-[45px] flex items-center justify-center w-[100%] bg-red-500 rounded-[5px]">
                        <h1 className="text-white text-[18px] font-[600]">
                            Rp. {totalPrice}
                        </h1>
                    </div>
                </Link>
            </div>
        </div>
            
    </div>
  )
}


const CartSingle = ({data,removeFromCartHandler,quantityChangeHandler}) => {
    const [value,setValue] = useState(1);
    const totalPrice = data.discountPrice * value;

    const increment = (data) => {
        setValue(value + 1);
        const updateCartData = {...data, qty : value + 1}
        quantityChangeHandler(updateCartData);
    }

    const decrement = (data) => {
        setValue(value === 1 ? 1 : value - 1);
        const updateCartData = {...data, qty : value === 1 ? 1 : value - 1}
        quantityChangeHandler(updateCartData);
    }
    return (
        <div className=" p-4">
            <div className="w-full flex items-center">
                <div className='flex flex-col gap-y-2'>
                        
                        <div className={`bg-green-400 border border-green-500 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`} onClick={() => increment(data)} >
                            <HiPlus size={18} color="white" />
                        </div>
                        <div className='ml-2'>
                            {data.qty}
                        </div>
                        <div className={`bg-white border border-green-100 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`} onClick={() => decrement(data)} >
                            <HiMinus size={18} color="black" />
                        </div>
                </div>
                <div>
                    <img src={`${data?.images[0]?.url}`} alt="" className="w-[100px] h-[80px] ml-2 rounded-md object-cover shadow-2xl" />
                </div>
                <div className="ml-5 justify-between items-center w-full">
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000081]'>Rp. {data.discountPrice} * {value} </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-red-600 font-Roboto">
                        Rp. {totalPrice}
                    </h4>
                </div>
                    <div>
                        <RxCross1 onClick={() => removeFromCartHandler(data)}
                            size={12}
                            className='cursor-pointer'
                        />
                    </div>
            </div>
        </div>
    )
}

export default Cart