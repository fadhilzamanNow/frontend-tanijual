import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { productData } from '../static/data';

import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/product';
import Loader from '../components/Layout/Loader';

const BestSellingPage = () => {
   
    const [data,setData] = useState([]);
    const dispatch = useDispatch()
    //const {isLoading, allProducts} = useSelector((state) => state.products)
    const {isLoading,allProducts} = useSelector((state) => state.products);
    
    /* setInterval(() => {
        console.log(allProducts)
    },2000) */

    useEffect(()=> {

        const d = allProducts
        setData(d);
        console.log(data)
        

        /* const d = allProducts && allProducts.sort((a,b) => {
            return a.total_sell - b.total_sell
        }) */
           /*  const d = productData && productData.sort((a,b) => {
                return a.total_sell - b.total_sell
            }) */
        //console.log("akhir allProducts : ", allProducts)
       /*  const d = allProducts;
        setData(d); */
        /* window.scrollTo(0,0); */
        /* console.log("isLoading : ", isLoading , allProducts) */

    },[allProducts])

    console.log("isi data :", data)
    const data2 = data?.filter((i) => i?.sold_out)
    console.log("isi data2 :" , data2)
  return (
    <div>
        <Header activeHeading={2}/>
        <br />
        <br />
        <div className={`${styles.section}`}>
            
          { 
            isLoading ? (<Loader />) : (
              <div className="grid grid-cols-[repeat(2,160px)]  justify-evenly gap-[10px] md:grid-cols-[repeat(4,200px)] md:gap-[25px] lg:grid-cols-[repeat(6,200px)] lg:gap-[30px] xl:grid-cols-[repeat(10,200px)] xl:gap-[30px]">
                {
                    data2 && data2.map((i,index) => <ProductCard data={i} key={index} />)
                }
                </div>
            ) 
          }
               
        </div>
    </div>
  )
}

export default BestSellingPage