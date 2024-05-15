import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { productData } from '../static/data';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard/ProductCard';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [data,setData] = useState([]);
    const categoryData = searchParams.get("category");
    

    useEffect(()=> {
        if(categoryData === null){
            const d = productData && productData.sort((a,b) => {
                return a.total_sell - b.total_sell
            })

            setData(d)
        }else{
            const d = productData && productData.filter((i) => {
                return i.category === categoryData
            })
            setData(d)
        };
        /* window.scrollTo(0,0); */
        console.log(categoryData)
    },[categoryData])
  return (
    <div>
        <Header activeHeading={3}/>
        <br />
        <br />
        <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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