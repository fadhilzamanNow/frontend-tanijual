import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import {Link, useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersOfShop } from '../../redux/actions/order';
import { backend_url, server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';



const OrderDetails = () => {

  const {orders, isLoading} = useSelector((state) => state.order);

  const {seller} = useSelector((state) => state.seller)
  const dispatch = useDispatch();
  const [status,setStatus] = useState("");
  const [option,setOption] = useState("");
  const navigate = useNavigate();

  const {id} = useParams();
  console.log("seller" , seller);
  console.log("orders", orders);
  console.log("id" , id);
  console.log("status option :" , status);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id))
},[])

  const data = orders && orders.find((item) => item._id === id);


  const orderUpdateHandler = async (e) => {
    console.log("update yang dikirim : ", status);
    await axios.put(`${server}/order/update-order-status/${id}`,{status : status },{ withCredentials : true}).then((res) => {
      toast.success("Order telah berhasil diupdate");
      navigate("/dashboard-orders");
      
    }).catch((error) => {
      toast.error(`${error.response.data.message}`);
    })
  }

  console.log("data status : ", data?.status);

  console.log("data status yang baru: ", status);
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
                <BsFillBagFill size={30} className='text-green-400' />
                <h1 className="pl-2 text-[25px]">Detail Order</h1>
            </div>
            <Link to="/dashboard-orders">
                <div className={`${styles.button} !bg-green-400 text-white font-[600] !h-[45px] text-[18px]`}>Semua Order</div>
            </Link>
        </div>
        <div className='w-full flex items-center justify-between pt-6'>
          <h5 className="text-black">
            Order ID : <span className="font-[500]">{data?._id?.slice(0,8)}</span>
          </h5>
          <h5 className="text-black">
            Dibuat : <span className="font-[500]">{data?.createdAt?.slice(0,10)}</span>
          </h5>
          
          
          </div> 
          <br />
          <br />
          {
            data && data?.cart.map((item,index) => {
              return (
                <div className="w-full flex items-start mb-5">
                  <img src={`${backend_url}/${item?.images[0]}`} alt="" 
                    className='w-[80px] h-[80px]'
                  />
                  <div className="w-full">
                    <h5 className='pl-3 text-[20px]'>
                      {item?.name}
                    </h5>
                    <h5 className='pl-3 text-[20px] text-black'>
                      Rp. {item?.discountPrice} * {item?.qty}
                    </h5>
                  </div>
                </div>
              )
            })
          }
          <div className="border-t w-full text-right">
              <h5 className="pt-3 text-[18px]">
                Total Harga <span className="">Rp. {data?.totalPrice}</span>
              </h5>
          </div>
          <br />
          <br />
          <div className="w=full 800px:flex items-center">
              <div className="w-full 800px:w-[60%]">
                <h4 className="pt-3 text-[20px] font-[600]">
                  Alamat Pengiriman :
                </h4>
                <h4 className='pt-3 text-[20px]'>
                  Alamat 1 : {data?.alamat.address1} 
                </h4>
                <h4 className='pt-3 text-[20px]'>
                  Alamat 2 : {data?.alamat.address2} 
                </h4>
                <h4 className="text-[20px]">
                    {data?.alamat?.country}
                </h4>
                <h4 class Name="text-[20px]">
                    {data?.alamat?.city}
                </h4>
                <h4 className="text-[20px]">
                    0{data?.user?.phoneNumber}
                </h4>
              </div>
              <div className="w-full 800px:w-[40%]">
                <h4 className='pt-3 text-[20px]'>
                  Informasi Pembayaran :
                </h4>
                <h4 className='pt-3 text-[20px]'>
                  Status Pembayaran : {
                      data?.paymentInfo?.status === "succeeded"? "Sukses" : "Gagal" 
                  }
                </h4>
              </div>
          </div>
          <br />
          <br />
          <h4 className="pt-3 text-[20px] font-[600]">Status Pemesanan : </h4>
                  {
                    data?.status !== "Memproses Pembatalan" && <div>
                       <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className='w-[200px] mt-2 border -[35px] rounded-[5px] '>
                {
                  [
                    "Dalam proses Pembayaran",
                    "Diserahkan ke kurir",
                    "Sedang dalam Perjalanan",
                    "Diterima"
                  ].slice(
                    [
                    "Dalam proses Pembayaran",
                    "Diserahkan ke kurir",
                    "Sedang dalam Perjalanan",
                    "Diterima"
                    ].indexOf(data?.status)
                  ).map((option,index) => {
                    return (
                      <option value={option} key={index} >
                        {option}
                      </option>
                    )
                  })
                }
              </select>
                    </div>
                  }
          <div className={`${styles.button} mt-5 !bg-white !rounded-[4px] text-red-400 font-600 !h-[45px] text-[18px]`} onClick={orderUpdateHandler}>
              Update Status
          </div>
    </div>
  )
}

export default OrderDetails