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
    <div>
        <Header />
        {isLoading ? (<Loader />) : (<ProductDetails data={data}/>)}
        
        {
            data && <SuggestedProduct data={data} />
        }
        <Footer />
       
    </div>
  )
}

export default ProductDetailsPage