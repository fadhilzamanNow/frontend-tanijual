import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import {Link, useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersOfShop } from '../../redux/actions/order';
import { backend_url, server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';





const OrderDetails = () => {

  const {orders, isLoading} = useSelector((state) => state.order);

  const {seller} = useSelector((state) => state.seller)
  const dispatch = useDispatch();
  const [status,setStatus] = useState("");
  const [option,setOption] = useState("");
  const navigate = useNavigate();
  const [selesai,setSelesai] = useState(0);

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
      window.location.reload()
      
    }).catch((error) => {
      toast.error(`${error.response.data.message}`);
    })
  }

  console.log("data status : ", data?.status);

  console.log("data status yang baru: ", status);

  const step = [
    'Dalam proses Pembayaran',
    'Diserahkan ke kurir',
    'Sedang dalam Perjalanan',
    'Diterima',
  ]

  const stepactive = [
    {angka : 1, status : 'Dalam proses Pembayaran'},
    {angka : 2, status : 'Diserahkan ke kurir'},
    {angka : 3, status : 'Sedang dalam Perjalanan'},
    {angka : 4, status : 'Diterima'},
  ]
  


  useEffect(() => {
    const hasil = stepactive.filter((status) => status.status === data?.status)
    
    console.log("hasilnya :", hasil[0]?.angka, hasil[0]?.status)
    setSelesai(hasil[0]?.angka)
  },[orders])
  return (
    <div className={`w-full pt-4 ${styles.section} overflow-hidden`} >
      <div className="text-center font-[600] text-[30px] font-Poppins relative mb-2 ">
        Detail Pemesanan
        <div>
        <IoMdArrowRoundBack size={30} color='black' className='absolute top-2 left-2' onClick={() => navigate("/dashboard-orders")}/>
        </div>
      </div>
        <div className='bg-white w-full h-[100vh]'>
          <div className='flex justify-center flex-1 mb-4 '>
            <Stepper activeStep={selesai} orientation='horizontal' className='mt-[20px]'  alternativeLabel>
                {step.map((label) => {
                  return (
                    <Step key={label} 
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                            color: "green"
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                            color: "#a5a8ad"
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel .MuiStepIcon-text": {
                            color: "#a5a8ad"
                        },
                        "& .MuiStepLabel-root .Mui-active": {
                            color: "gray"
                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                            color: "gray"
                        },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                            fill: "white"
                        }
                    }}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })}
            </Stepper>
          </div>
        <div className="w-full flex flex-col items-center justify-between">
          <div className='flex items-center justify-center'>
            {
                      data?.status !== "Diterima" && 
                      <div className='flex items-center justify-center gap-x-1'>
                      <div>
                        <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className='w-[200px] mt-2 border rounded-[5px] '>
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
                      <div className={`${styles.button} mt-5 !bg-white !rounded-[4px] text-red-400 font-600 !h-[45px] text-[18px] border border-gray-200 !p-1`} onClick={orderUpdateHandler}>
                        Update Status
                    </div>
                      </div>
                    }
              
          </div>
        
            <div className="flex items-center">
                <BsFillBagFill size={30} className='text-green-400' />
                <h1 className="pl-2 text-[25px]">Detail Order</h1>
            </div>
            
        </div>
        <div className='w-full flex flex-col pt-6  pb-4 gap-y-[5px] mx-[25px]'>
          <h5 className="text-black font-[600] text-[24px]"> 
            Informasi Order
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center md:border-t md:border-t-gray-200 ">

          
            <div className='grid grid-cols-1 md:text-[24px] mb-4 border-b border-b-gray-200 md:border-none pb-4' >    
              <h5 className="text-black">
                Order ID : <span className="font-[500]">{data?._id}</span>
              </h5>
              <h5 className="text-black">
                Pesanan Dibuat : <span className="font-[500]">{data?.createdAt?.slice(0,10)}</span>
              </h5>
              <h5>
                Biaya : <span className='font-[500]'>Rp. {data?.totalPrice}</span>
              </h5>
              <h5>
                Penerima : <span className="font-[500]">{data?.user?.name}</span>
              </h5>
              <h5>
                Alamat 1 :<span className='font-[500]'>{data?.alamat?.address1} </span>
              </h5>
              <h5>
                Alamat 2 :<span className='font-[500]'>{data?.alamat?.address2} </span>
              </h5>
              <h5>
                Metode Pembayaran : <span className="font-[500]">{data?.paymentInfo?.type}</span>
              </h5>
              <h5>
                Nomor Telefon : <span className="font-[500]">{data?.user?.phoneNumber ? ("0" + data?.user?.phoneNumber) : ("-")}</span>
              </h5>
            </div>
            {
            data && data?.cart.map((item,index) => {
              return (
                <div className="w-full flex items-center mb-5 place-self-center">
                  <img src={`${item?.images[0]?.url}`} alt="" 
                    className='w-[80px] h-[80px] md:w-[250px] md:h-[250px]'
                  />
                  <div className="w-full">
                    <h5 className='pl-3 text-[20px] font-[500] md:text-[30px]'>
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
          </div>
          </div> 
          <br />
          <br />
          
       
         
          
                 
          </div>
    </div>
  )
}

export default OrderDetails