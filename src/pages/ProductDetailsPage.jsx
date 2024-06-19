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


const ProductDetailsPage = () => {

    const {name} = useParams();
    const [data,setData] = useState(null)
    const productName = name.replace(/-/g," ");
    const {allProducts, isLoading} = useSelector((state) => state.products)
   

    console.log(productName);
    useEffect(()=> {
        const data = allProducts && allProducts.find((i) => i._id === name);
        setData(data);
        
    },[allProducts])
    
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
        <Footer />
        <div className="sticky h-[50px] w-full bottom-0  bg-white z-[99999999999999] rounded flex justify-around items-center">
        
          <div className="text-[12px] text-gray-500 p-2 rounded border border-gray-500 h-[80%] flex items-center !px-3">
            <BsFillChatLeftTextFill/>
          </div>
          <div className="flex  items-center border border-green-500 bg-white p-2 rounded text-[12px] h-[80%] text-green-500 w-[40%] justify-between">
              <div className="text-[20px]">
                -
              </div>
              <div>
                1
              </div>
              <div className="text-[20px]">
                +
              </div>
             
          </div>
          <div className="bg-green-500 text-white font-[600] text-center rounded p-2 w-[45%]">
                + Keranjang
          </div>
        </div>
    </div>
  )
}

export default ProductDetailsPage