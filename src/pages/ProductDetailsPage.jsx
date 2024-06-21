import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import ProductDetails from "../components/Products/ProductDetails"
import { productData } from '../static/data.js';
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer.jsx';
import SuggestedProduct from "../components/Products/SuggestedProduct"
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader.jsx';
import { getAllProductsShop } from '../redux/actions/product.js';
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { addToCart } from '../redux/actions/cart.js';
import { toast } from 'react-toastify';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../server.js';





const ProductDetailsPage = () => {

    const {name} = useParams();
    const [data,setData] = useState(null)
    const productName = name.replace(/-/g," ");
    const {allProducts, isLoading} = useSelector((state) => state.products)
    const [count,setCount] = useState(1)
    const {cart} = useSelector((state) => state.cart)
    const {user,isAuthenticated} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

   

    console.log(productName);
    useEffect(()=> {
        const data = allProducts && allProducts.find((i) => i._id === name);
        setData(data);
        
    },[allProducts])

    const incrementCount = () => {
      setCount(count + 1);
  }

    const decrementCount = () => {
        setCount(count - 1);
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
      setCount(1)
  }

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
    
  return (
    <div className="relative">
        <Header />
        {isLoading ? (<Loader />) : (
          <div className="!mt-10 sm:!mt-0">
            <ProductDetails data={data}/>
          </div>
          
          )}
        
        {
            data && <SuggestedProduct data={data} />
        }
        
        <div className="sticky h-[50px] w-full bottom-0  bg-white z-[99999999999999] rounded flex justify-around items-center xl:hidden">
        
          <div className="text-[12px] text-gray-500 p-2 rounded border border-gray-500 h-[80%] flex items-center !px-3" onClick={() => handleMessageSubmit()}>
            <BsFillChatLeftTextFill/>
          </div>
          <div className="flex  items-center border border-green-500 bg-white p-2 rounded text-[12px] h-[80%] text-green-500 w-[40%] justify-between">
              <div className="text-[20px]" onClick={() => decrementCount()}>
                -
              </div>
              <div>
                {count}
              </div>
              <div className="text-[20px]" onClick={() => incrementCount()}>
                +
              </div>
             
          </div>
          <div className="bg-green-500 text-white font-[600] text-center rounded p-2 w-[45%]" onClick={() => addToCartHandler(data._id)}>
                + Keranjang 
          </div>
        </div>
    </div>
  )
}

export default ProductDetailsPage