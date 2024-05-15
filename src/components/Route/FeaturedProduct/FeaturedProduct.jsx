import React from 'react'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'

const FeaturedProduct = () => {
  return (
    <div className='mt-10'>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
             <h1>Saran Produk</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[30px]">
                {
                    productData && productData.map((i,index) => {
                        return (
                            <ProductCard data={i} key ={index}/>
                        )
                    })
                }
            </div>
        </div>
   
        
    </div>
  )
}

export default FeaturedProduct