import React from 'react'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'

const FeaturedProduct = () => {

    const {allProducts} = useSelector((state) => state.products)
  return (
    <div className='mt-10'>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
             <h1>Saran Produk</h1>
            </div>
            <div className="grid grid-cols-[repeat(2,200px)]  justify-evenly gap-[20px] md:grid-cols-[repeat(4,200px)] md:gap-[25px] lg:grid-cols-[repeat(6,200px)] lg:gap-[30px] xl:grid-cols-[repeat(10,200px)] xl:gap-[30px]">
                {
                    allProducts && allProducts.map((i,index) => {
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