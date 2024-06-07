import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const Payment = () => {
  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [orderData,setOrderData] = useState("")
  const [open,setOpen] = useState(false);


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

  /*  */

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
          <PaymentInfo user={user}  open={open} setOpen={setOpen} onApprove={onApprove} createOrder={createOrder} cashOnDeliveryHandler={cashOnDeliveryHandler} />
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