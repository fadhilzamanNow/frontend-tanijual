import React,{useState,useEffect} from 'react'
import styles from '../../../styles/styles';
import { productData } from '../../../static/data';
import ProductCard from "../ProductCard/ProductCard.jsx"
import { useSelector } from 'react-redux';

const BestDeals = () => {

    const [data,setData] = useState([]);
    const {allProducts} = useSelector((state) => state.products)


    useEffect(() => {
        const d = allProducts 
        

        const firstFive = d && d.slice(0.5);
        setData(firstFive);
    },[])

    const data2= data?.filter((item) => item.discountPrice <= 10000)
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
            <h1>Produk Murah Di Kantong</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[30px] xl:grid-cols-5 xl:gap-[30px]">
                {
                    data2 && data2.map((i,index) => {
                        return (
                            <ProductCard data={i} key={index} /> 
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BestDeals