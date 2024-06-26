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

    console.log("best deal jumlah", data2?.length)

    const slice = (awal,akhir) => {
        return data2.slice(awal,akhir)
    } 
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
            <h1>Produk Murah Di Kantong</h1>
            </div>
            <div className="grid grid-cols-[repeat(2,160px)]  justify-evenly gap-[10px] md:grid-cols-[repeat(4,200px)] md:gap-[25px] lg:grid-cols-[repeat(5,160px)] lg:gap-[30px] xl:grid-cols-[repeat(6,180px)] xl:gap-[10px] 2xl:grid-cols-[repeat(7,190px)] 2xl:gap-[10px]">
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