import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { BsFillBagFill } from 'react-icons/bs'
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { getAllOrdersOfShop, getAllOrdersOfUser } from '../redux/actions/order';
import { backend_url, server} from '../server';
import { RxCross1 } from 'react-icons/rx';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';



const UserOrderDetails = () => {

  const {orders, isLoading} = useSelector((state) => state.order);

  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [status,setStatus] = useState("");
  const [option,setOption] = useState("");
  const [selectedItem,setSelectedItem] = useState([]);
  const [open,setOpen] = useState(false);
  const [rating,setRating] = useState("");
  const [comment,setComment] = useState("");

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
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
                <BsFillBagFill size={30} className='text-green-400' />
                <h1 className="pl-2 text-[25px]">Detail Order</h1>
            </div>
            <Link to="/profile">
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
                  <img src={`${item.images[0].url}`} alt="" 
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
                <h4 className="text-[20px]">
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
           
                {
                  data?.status === "Diterima" ? (
                    <div className={`${styles.button} text-white p-5 text-center`}
                      onClick={refundHandler}
                    >
                        Minta Pengembalian
                    </div>
                  ) : (null)
                }
              </div>
          </div>
          <br />
          <br />
          <h4 className="pt-3 text-[20px] font-[600]">Status Pemesanan : </h4>
          <h1>{data?.status}</h1>
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