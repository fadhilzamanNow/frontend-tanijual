import React, { useState } from 'react'
import { productData } from '../../static/data';
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ShopProfileData = ({isOwner}) => {

    const [active,setActive] = useState(1);
  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between ">
            <div className="w-full flex">
                <div className="flex items-center">
                    <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px]`}
                        onClick={() => setActive(1)}
                        >
                        Produk Toko
                    </h5>
                </div>
                <div className="flex items-center">
                    <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px]`}
                    onClick={() => setActive(2)} 
                    >
                        Event Sedang Berjalan
                    </h5>
                </div>
                <div className="flex items-center">
                    <h5 className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px]`}
                    onClick={() => setActive(3)}
                    >
                        Review Toko
                    </h5>
                </div>
            </div>
            <div>
                {
                    isOwner && (
                        <div>
                            <Link to="/dashboard">
                                <div className={`${styles.button} !rounded-[4px] h-[42px] text-white`}>
                                    <span>Cek Dashboard</span>
                                </div>
                            </Link>
                        </div>
                    )
                }
            </div>
            
        </div>
        <br />
        {active === 1 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:md-grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {
                productData && productData.map((i,index) => {
                    return <ProductCard data={i} key={index} isShop={true} />
                })
            }
        </div>
        ) : (null)}
        
    </div>
  )
}

export default ShopProfileData