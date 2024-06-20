import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { productData } from '../static/data';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [data,setData] = useState([]);
    const categoryData = searchParams.get("category");

    const {allProducts,isLoading} = useSelector((state) => state.products)
    

    useEffect(()=> {
        if(categoryData === null){
            const d = allProducts
            setData(d)
        }else{
            const d = allProducts && allProducts.filter((i) => {
                return i.category === categoryData
            })
            setData(d)
        };
        /* window.scrollTo(0,0); */
    },[allProducts])
  return (
    <div>
        <Header activeHeading={3}/>
        
        <div className={`${styles.section} !mt-20 sm:!mt-2`}>
        <div className="grid grid-cols-[repeat(2,160px)]  justify-evenly gap-[10px] md:grid-cols-[repeat(4,200px)] md:gap-[25px] lg:grid-cols-[repeat(6,200px)] lg:gap-[30px] xl:grid-cols-[repeat(6,200px)] xl:gap-[10px] ">
        {
                    data && data.map((i,index) => <ProductCard data={i} key={index} />)
                }
            </div>
                {
                    data && data.length === 0 ? (<h1 className="text-center w-full ">Produk yang kamu cari tidak Ditemukan ....... 😔</h1>)  : (null)
                }
        </div>
    </div>
  )
}

export default ProductsPage