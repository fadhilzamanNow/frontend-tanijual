import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"
import {RxCross1} from "react-icons/rx"

const Payment = () => {
  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [orderData,setOrderData] = useState("")
  const [open,setOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"))
    setOrderData(orderData);
  },[])

  const createOrder = (data,actions) => {
    //
    return actions.order.create({
      purchase_units : [
        {
          description : "JualTani",
          amount : {
            currency_code : "USD",
            value : orderData?.totalPrice
          },
        }
      ],
      application_context : {
        shipping_preference : "NO_SHIPPING",
      }
    }).then((orderId) => {
      return orderId;
    })

  }

  const onApprove = async (data,actions) => {
    return actions.order.capture().then(function(details){
      const {payer} = details;

      let paymentInfo = payer;

      if(paymentInfo !== undefined){
        paypalPaymentHandler(paymentInfo);
      }
    })
  }

  const paypalPaymentHandler = async(paymentInfo) => {
    const config = {
      headers : {
        "Content-Type" : "application/json",
      },
      withCredentials : true
    };

    order.paymentInfo = {
      id : paymentInfo?.payer_id,
      status : "succeedded",
      type : "Paypal",
    };

    await axios.post(`${server}/order/create-order`, order, config).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order Berhasil");
      localStorage.setItem("cartItems", JSON.stringify([]))
      localStorage.setItem("latestOrder", JSON.stringify([]))
    }).catch((error) => {
      toast.error(`terdapat sebuah error : ${error}`)
    })
  }

  const PaymentData = {
    amount : Math.round(orderData?.totalPrice * 100)
  }

  const order = {
    cart : orderData?.cart,
    alamat : orderData?.alamat,
    user : user && user,
    totalPrice : orderData?.totalPrice
  };

  const paymentHandler = async(e) => {
    e.preventDefault()
    try{
      const config = {
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials : true
      };
      console.log("paymentdata ", PaymentData);
      const {data} = await axios.post(`${server}/payment/process`,PaymentData,config)

      const client_secret = data.client_secret;
      console.log(client_secret , "client secretna");
      if(!stripe || !elements) return ;

      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method : {
          card : elements.getElement(CardNumberElement),
        }
      })
      console.log("ini adalah resultnya", result)

      if(result.error){
        toast.error("error disini")
      }else{
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo = {
            id : result.paymentIntent.id,
            status : result.paymentIntent.status,
            type : "Credit Card",
          }

          await axios.post(`${server}/order/create-order`, order, config).then((res) => {
            setOpen(false);
            navigate("/order/success");
            toast.success("Order Berhasil");
            localStorage.setItem("cartItems", JSON.stringify([]))
            localStorage.setItem("latestOrder", JSON.stringify([]))
          }).catch((error) => {
            toast.error(`terdapat sebuah error : ${error}`)
          })
        }
      }
    }catch(error){

    }
  }

  const cashOnDeliveryHandler = async(e) => {
    e.preventDefault()

    const config = {
      headers : {
        "Content-Type" : "application/json",
      },
      withCredentials : true
    };
    
    order.paymentInfo = {
      type : "COD",
    }
    await axios.post(`${server}/order/create-order`, order, config).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order Berhasil");
      localStorage.setItem("cartItems", JSON.stringify([]))
      localStorage.setItem("latestOrder", JSON.stringify([]))
    }).catch((error) => {
      toast.error(`terdapat sebuah error : ${error}`)
    })
  }

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo user={user}  open={open} setOpen={setOpen} onApprove={onApprove} createOrder={createOrder} paymentHandler={paymentHandler} cashOnDeliveryHandler={cashOnDeliveryHandler} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData}/>
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({open,setOpen,onApprove, createOrder,paymentHandler, cashOnDeliveryHandler, user}) => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      
       {/*  <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Debit / Kartu Kredit
          </h4>
        </div> */}

        {/* pay with card */}
        {/* {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Nama Kartu</label>
                  <input required className={`${styles.input} !w-[95%]`} placeholder={`${user?.name}`} value={user?.name} />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Masa Berlaku</label>
                  <CardExpiryElement className={`${styles.input}`} 
                    options={{
                      style : {
                        base : {
                          fontSize : "19px",
                          lineHeight : 1.5,
                          color : "#444"
                        },
                        empty : {
                          color : "black",
                          backgroundColor : "transparent",
                          "::placeholder" : {
                            color : "#444"
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Nomor Kartu</label>
                  <CardNumberElement className={`${styles.input} !h-[35px] !w-[95%]`} 
                    options={{
                      style : {
                        base : {
                          fontSize : "19px",
                          lineHeight : 1.5,
                          color : "#444"
                        },
                        empty : {
                          color : "black",
                          backgroundColor : "transparent",
                          "::placeholder" : {
                            color : "#444"
                          }
                        }
                      }
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement className={`${styles.input} !h-[35px] `} 
                    options={{
                      style : {
                        base : {
                          fontSize : "19px",
                          lineHeight : 1.5,
                          color : "#444"
                        },
                        empty : {
                          color : "black",
                          backgroundColor : "transparent",
                          "::placeholder" : {
                            color : "#444"
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null} */}
     

      <br />
      

       <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]" >
            Bayar di Tempat
          </h4>
        </div>

        {/* pay with card */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

    </div>
  );
};
const CartData = ({orderData}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
        <h5 className="text-[18px] font-[600]">Rp. {orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Pajak :</h3>
        <h5 className="text-[18px] font-[600]">Rp. {orderData?.shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]"> {orderData?.discountPrice ? ("- Rp. "+ orderData?.discountPrice?.toString()) : (null)}</h5>
      </div >
      <div className="flex justify-between border-b pb-3 mt-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
        <h5 className="text-[18px] font-[600] ">Rp. {orderData?.totalPrice}</h5>
      </div >
      <br />
      <form>
        {orderData?.couponCode ? (

          <div>
            <div className="text-green-500">
              Kode yang berhasil digunakan : 
            </div>
             <input
            type="text"
            className={`${styles.input} h-[40px] pl-2 !bg-gray-400 !text-white`}
            placeholder="Kode Kupon"
            required
            readOnly
            value={orderData?.couponCode}
            />
          </div>
          
         
        ) : (<div className="bg-red-500 text-center text-white p-3 rounded-md">
          Tidak Menggunakan Kode Kupon
        </div>)}
        
        
      </form>
    </div>
  );
};

export default Payment;