import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import ProductDetails from "../components/Products/ProductDetails"
import { productData } from '../static/data.js';
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer.jsx';
import SuggestedProduct from "../components/Products/SuggestedProduct"

const ProductDetailsPage = () => {

    const {name} = useParams();
    const [data,setData] = useState(null)
    const productName = name.replace(/-/g," ");

    console.log(productName);
    useEffect(()=> {
        const data = productData.find((i) => i.name === productName);
        setData(data);
    },[productName])

    
  return (
    <div>
        <Header />
        <ProductDetails data={data}/>
        {
            data && <SuggestedProduct data={data} />
        }
       <Footer />
    </div>
  )
}

export default ProductDetailsPage