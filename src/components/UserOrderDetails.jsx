import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import {Link, useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersOfShop, getAllOrdersOfUser } from '../redux/actions/order';
import { backend_url, server} from '../server';
import { RxCross1 } from 'react-icons/rx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



const UserOrderDetails = () => {

  const {orders, isLoading} = useSelector((state) => state.order);
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [status,setStatus] = useState("");
  const [option,setOption] = useState("");
  const [selectedItem,setSelectedItem] = useState([]);
  const [open,setOpen] = useState(false);
  const [rating,setRating] = useState("");
  const [comment,setComment] = useState("");
  const [selesai,setSelesai] = useState(0);

  const {id} = useParams();
  console.log("user" , user);
  console.log("orders", orders);
  console.log("id" , id);
  console.log("status option :" , status);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id))
},[dispatch])

  const data = orders && orders.find((item) => item?._id === id);


  const orderUpdateHandler = async (e) => {
    alert("Mantap")
  }


  const reviewHandler = async (e) => {
    e.preventDefault();
    console.log("selectedItem : ", selectedItem);
    await axios.put(`${server}/product/create-new-review`,{
      user,
      rating,
      productId : selectedItem?._id,
      comment,
      orderId : id 
    }, {withCredentials : true}).then((res) => {
      toast.success(`${res.data.message}`);
      setComment("");
      dispatch(getAllOrdersOfUser(user?._id))
      setRating(null);
      setOpen(false);
    }).catch((error) => {
      toast.error(`${error.response.data.message}`);
    })
  }

  console.log("data : ", data?.status);

  const refundHandler = async (e) => {
    e.preventDefault();
    await axios.put(`${server}/order/order-refund/${id}`,{
      status : "Memproses Pembatalan"
    }).then((res) => {
      toast.success(`${res.data.message}`)
      dispatch(getAllOrdersOfUser(user?._id))
    }).catch((err) => {
      toast.error(`${err.response.data.message}`)
    })
  }

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
    <div className={`py-4 min-h-screen ${styles.section} !mt-12 sm:!mt-0 !mx-0 !w-full`}>
        <div className="text-center font-[600] text-[30px] font-Poppins relative mb-2 ">
        Detail Pemesanan
        <div>
        <IoMdArrowRoundBack size={30} color='black' className='absolute top-2 left-2' onClick={() => navigate("/profile")}/>
        </div>
      </div>
      <div className='bg-white w-full min-h-[50vh] flex flex-col items-center'>
          <div className='flex justify-center flex-1 mb-4 '>
            <Stepper activeStep={selesai} orientation='horizontal' className='mt-[20px]'  alternativeLabel>
                {step.map((label) => {
                  return (
                    <Step key={label} className="h-[90px] w-[90px] md:w-[120px] lg:w-[150px] xl:w-[200px]"
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
                            color: "gray",
                          

                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                            color: "gray",
                            
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
          <div className="flex justify-center">
          {
            data && data?.cart.map((item,index) => {
              return (
                <div className="w-full flex items-start mb-5">
                  {
                   item?.isReviewed  ? (
                        <div>Terima kasih atas Ulasannya</div>
                   ) : (
                    <div className={`${styles.button} text-white !bg-green-400 text-center`} onClick={() => setSelectedItem(item) || setOpen(true) }>
                      Tuliskan sebuah review
                    </div>
                   )
                  }
                </div>
              )
            })
          }
          </div>
        <div className="w-full flex flex-col items-center justify-between">
          
        
            
            
        </div>
        <div className='w-full flex flex-col pt-6  pb-4 gap-y-[5px] mx-[25px]'>
         
          <div className="flex flex-col sm:flex-row  justify-center items-center w-full gap-x-5">

          <div>
              {
              data && data?.cart.map((item,index) => {
                return (
              
                  <div className="w-full flex items-center mb-5 justify-center">
                    <img src={`${item?.images[0]?.url}`} alt="" 
                      className='w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-cover'
                    />
                    <div className="w-full">
                      <h5 className='pl-3 text-[16px] font-[500] md:text-[30px]'>
                        {item?.name}
                      </h5>
                      <h5 className='pl-3 text-[14px] text-black'>
                        Rp. {item?.discountPrice} * {item?.qty}
                      </h5>
                    </div>
                  </div>
                
                )
              })
              }
            </div>
            <div className='grid grid-cols-1 md:text-[24px] mb-4 border-b border-b-gray-200 md:border-none pb-4 text-[14px]' >    
              <h5 className="text-black text-[16px]">
                Order ID : <span className="font-[500]">{data?._id}</span>
              </h5>
              <h5 className="text-black text-[16px]">
                Pesanan Dibuat : <span className="font-[500]">{data?.createdAt?.slice(0,10)}</span>
              </h5>
              <h5 className="text-black text-[16px]">
                Biaya : <span className='font-[500]'>Rp. {data?.totalPrice}</span>
              </h5>
              <h5 className="text-[16px]">
                Penerima : <span className="font-[500]">{data?.user?.name}</span>
              </h5>
              <h5 className="text-[16px]">
                Alamat 1 :<span className='font-[500]'>{data?.alamat?.address1} </span>
              </h5>
              <h5 className="text-[16px]">
                Alamat 2 :<span className='font-[500]'>{data?.alamat?.address2} </span>
              </h5>
              <h5 className="text-[16px]">
                Metode Pembayaran : <span className="font-[500]">{data?.paymentInfo?.type}</span>
              </h5>
              <h5 className="text-[16px]">
                Nomor Telefon : <span className="font-[500]">{data?.user?.phoneNumber ? ("0" + data?.user?.phoneNumber) : ("-")}</span>
              </h5>
            </div>
            
          </div>
          </div> 
          <br />
          <br />
          
       
         
          
                 
          </div>
       
          <br />
          <br />
          

          {
            open && (
              <div className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center">
                  <div className="w-[50%] h-[80vh] bg-[#fff] shadow rounded-md p-3">
                      <div className="w-full flex justify-end p-3">
                        <RxCross1 size={30} onClick={() => setOpen(false)} />
                      </div>
                      <h2 className='text-[30px] font-[500] font-Poppins text-center'>
                          Berikan Review
                      </h2>
                      <br />
                      <div className="w-full flex">
                        <img src={`${selectedItem?.images[0].url}`} alt="" className='w-[80px] h-[80px] ml-3'/>
                      </div>
                      <div>
                        <div className="pl-3 text-[20px]">
                          {selectedItem?.name}
                        </div>
                        <h4 className='pl-3 text-[20px]'>
                            Rp. {selectedItem?.discountPrice} x {selectedItem?.qty}
                        </h4>
                      </div>
                      <br />
                      <br />
                      <h5 className="pl-3 text-[20px] font-[500]">
                          Beri Rating Produk :  
                      </h5>
                      <div className="flex w-full ml-2 pt-1">
                        {
                          [1,2,3,4,5].map((i) => rating >= i ? (
                            <AiFillStar key={i} className="mr-2 cursor-pointer" color='yellow' size={25} onClick={() => setRating(i)}/>
                          ) : (
                            <AiOutlineStar key={i} className="mr-2 cursor-pointer" color='yellow' size={25} onClick={() => setRating(i)}/>
                          ))
                        }
                      </div>
                      <br />
                      <div className="w-full ml-3">
                        <label htmlFor="block text-[20px] font-[500px]">
                          Menulis sebuah komen
                        <span className="font-[400] text-[16px] text-[#000]">
                            (optional)
                        </span>
                        </label>
                        <textarea name="" id="" placeholder="Bagaimana produknyna menurut kamu?" className="mt-2 w-[95%] outline-green-400 shadow-2xl" cols="20" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} >

                        </textarea>
                        <div className={`${styles.button} text-white text-[20px] ml-3`} onClick={rating > 1 ? reviewHandler : () => alert("Masukkan rating  terlebih dahulu")}>
                          Kirimkan Review
                        </div>

                      </div>
            

                  </div>
                 


                  
              </div>
            )
          }
          
          <br />
          <br />
         
          {/* <select name="" id="" value={status} onChange={(e) => setStatus(e.target.value)} className='w-[200px] mt-2 border -[35px] rounded-[5px] '>
            {
              [
                "Dalam Proses Pembayaran",
                "Diserahkan ke kurir",
                "Sedang Dikirim",
                "Diterima"
              ].slice(
                [
                "Dalam Proses Pembayaran",
                "Diserahkan ke kurir",
                "Sedang Dikirim",
                "Diterima"
                ]
              ).map((option,index) => {
                return (
                  <option value={option} key={index} >
                    {option}
                  </option>
                )
              })
            }
          </select>
          <div className={`${styles.button} mt-5 !bg-white !rounded-[4px] text-red-400 font-600 !h-[45px] text-[18px]`} >
              Update Status
          </div>
          <Link to="/">
          <div styles={`${styles.button} text-white`}>
              Kirim Pesan
          </div>
          </Link> */}
          
    </div>
  )
}

export default UserOrderDetails;