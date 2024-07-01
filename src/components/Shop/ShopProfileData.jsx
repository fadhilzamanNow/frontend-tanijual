import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data';
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/styles';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader';
import { getAllProductsShop } from '../../redux/actions/product';
import { getAllEventsShop } from '../../redux/actions/event';
import Ratings from '../Products/Ratings';
import axios from 'axios';
import { server } from '../../server';

const ShopProfileData = ({isOwner}) => {

    const {products, isLoading} = useSelector((state) => state.products)
    const { events } = useSelector((state) => state.events);

    const {id} = useParams();
    const dispatch = useDispatch();
    console.log("id ", id);

    useEffect(() => {
        dispatch(getAllProductsShop(id));
        dispatch(getAllEventsShop(id));
    },[dispatch])

    const [active,setActive] = useState(1);

    const allReviews = products && products.map((product) => product.reviews).flat();
    console.log("review", allReviews)
  return (
    <>
    {
        isLoading ? (<Loader />) : (
                    <div className="w-full">
                <div className="flex w-full items-center justify-between ">
                    <div className="w-full flex">
                        <div className="flex items-center">
                            <h5 className={`font-[600] text-[12px] sm:text-[20px] ${active === 1 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px] `}
                                onClick={() => setActive(1)}
                                >
                                Produk Toko
                            </h5>
                        </div>
                        <div className="flex items-center">
                            <h5 className={`font-[600] text-[12px] sm:text-[20px] ${active === 2 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px] `}
                            onClick={() => setActive(2)} 
                            >
                                Event Sedang Berjalan
                            </h5>
                        </div>
                        <div className="flex items-center">
                            <h5 className={`font-[600] text-[12px] sm:text-[20px] ${active === 3 ? "text-red-500" : "text-black"} cursor-pointer pr-[20px] `}
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
                        products && products.map((i,index) => {
                            return <ProductCard data={i} key={index} isShop={true} />
                        })
                    }
                </div>
                ) : (null)}
                {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                  toko={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              Belum ada Promo pada Toko ini !
            </h5>
          )}
        </div>
      )}
      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <div>
                  <FotoProfil user={item?.user?._id}  />    
                </div>  
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item?.user?.name}</h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-[14px]"></p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              Belum ada review pada toko ini
            </h5>
          )}
        </div>
      )}               
            </div>
        )
    }
    </>
  )
}

export default ShopProfileData

const FotoProfil = ({user}) => {
    const [gambar,setGambar] = useState();
    console.log("id user", user);

    useEffect(() => {
        axios.get(`${server}/user/user-info/${user}`).then((res) => {
            console.log("hasil :" ,res?.data?.user?.avatar?.url)
            setGambar(res?.data?.user?.avatar?.url)
        }).catch((err) => {
            console.log("error :", err )
        })
    },[])
    return (
        <div>
            <img src={`${gambar}`} alt="" className="xl:w-[50px] xl:h-[50px] h-[30px] w-[30px]  rounded-full" />
        </div>
    )
}