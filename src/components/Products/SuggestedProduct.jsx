import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const SuggestedProduct = ({data}) => {
    const [products,setProducts] = useState(null);
    const {allProducts} = useSelector((state) => state.products);

    useEffect(() => {
        const d = allProducts && allProducts.filter((i) => i.category === data.category && i._id !== data._id)
        setProducts(d)
    },[allProducts])

    
  return (
    <div>
        {
            data ? (
            <div className={`${styles.section}`}>
                <h2 className={`${styles.heading}`}>Produk Terkait</h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        products && products.map((i,index) => {
                            return (
                                <ProductCard data={i} key={index}/>
                            )
                        })
                    }
                </div>
            </div>) : (null)
        }
    </div>
  )
}

export default SuggestedProduct