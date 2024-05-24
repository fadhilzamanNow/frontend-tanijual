import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { City, Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import {server} from "../../server.js"



const Checkout = () => {
    const {user} = useSelector((state) => state.user);
    const {cart} = useSelector((state) => state.cart);
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [userInfo,setUserInfo] = useState(false);
    const [address1,setAddress1] = useState("");
    const [address2,setAddress2] = useState("");
    const [zipCode,setZipCode] = useState(null);
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [couponCode,setCouponCode] = useState("");
    const [discountPrice,setDiscountPrice] = useState(null);
  

    const subTotalPrice = cart.reduce((acc,item) => acc + item.qty * item.discountPrice, 0)
    const shipping = subTotalPrice * 0.1 ;
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = couponCode;

      await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
        const shopId = res?.data?.couponCode?.shopId
        const diskon = res?.data?.couponCode?.value
        console.log(res.data)
        if(res.data.couponCode !== null){
          const isCouponValid = cart && cart.filter((item) => item?.shopId === shopId)

          if(isCouponValid.length === 0){
            toast.error("Kode kupon tidak valid untok toko ini")
            setCouponCode("");
          }else{
            const productOK = isCouponValid.reduce((acc,item) => acc + item.qty * item.discountPrice, 0)
            const hargadiskon = (productOK * diskon)/100 ;
            console.log(hargadiskon);
            setDiscountPrice(hargadiskon);
            setCouponCode(res?.data?.couponCode?.name)
            toast.success("Kode Kupon berhasil digunakan")
            
          }
        } 
        if(res.data.couponCode === null) {
          toast.error("Kode kupon yang kamu masukkan tidak ada");
          setCouponCode("");
        }
      })
    }

    const discountPercentage = couponCode ? discountPrice : "";
    if(discountPercentage){
      console.log("kupon kode ada")
    }
    const totalPrice = couponCode ? (subTotalPrice + shipping - discountPercentage).toFixed(): (subTotalPrice + shipping).toFixed() ;


    useEffect(() => {
        window.scrollTo(0,0);
    },[])


  const navigate = useNavigate();

  const paymentSubmit = () => {
    if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === ""){
      toast.error("Alamat yang kamu masukkan belum diisi semua!")
    }else{
      const alamat = {
        address1,
        address2,
        zipCode,
        country,
        city
      }
  
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        alamat,
        user,
        couponCode
      }
  
  
      //taroh ke local storage
  
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo 
          user={user} 
          setCountry = {setCountry} country ={country}
          setCity = {setCity} city = {city}
          setUserInfo = {setUserInfo} userInfo ={userInfo}
          setAddress1 = {setAddress1} address1 = {address1}
          setAddress2 = {setAddress2} address2 = {address2}
          setZipCode = {setZipCode} zipCode = {zipCode}          
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData cart={cart} handleSubmit={handleSubmit} totalPrice={totalPrice} shipping={shipping} subTotalPrice={subTotalPrice} couponCode={couponCode} setCouponCode={setCouponCode} discountPercentage={discountPercentage}/>
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Bayar</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({user, setCountry, country, setCity , city, setUserInfo, userInfo , setAddress1, address1 , setAddress2, address2 , setZipCode , zipCode}) => {
  
  

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Nama Lengkap</label>
            <input type="text" required className={`${styles.input} !w-[95%]`} value={user?.name} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email</label>
            <input type="email" required className={`${styles.input}`} value={user?.email}/>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Nomor Telefon</label>
            <input
              type="number"
              required
              className={`${styles.input} !w-[95%]`}
              value = {user?.phoneNumber}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Kode Pos</label>
            <input type="number" required className={`${styles.input}`} onChange={(e) => setZipCode(e.target.value)} value={zipCode}/>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Negara</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Pilih negaramu
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Kota</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={city} onChange={(e) => setCity(e.target.value)}>
              <option className="block pb-2" value="">
                Pilih kotamu
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Alamat 1 </label>
            <input
              type="address"
              required
              className={`${styles.input} !w-[95%]`}
              value = {address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Alamat 2</label>
            <input type="address" required className={`${styles.input}`} 
                value = {address2}
                onChange = {(e) => setAddress2(e.target.value)}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5 className="text-[18px] cursor-pointer flex items-center gap-x-5" onClick={() => setUserInfo(!userInfo)}>
     {userInfo ? (<div onClick={() => setAddress1("") || setAddress2("") || setZipCode() || setCountry("") || setCity("")} className="text-[18px] cursor-pointer flex items-center gap-x-5"><FaChevronDown size={15} className="mt-1" /> Mengisi dengan alamat sendiri </div>
) : (<><FaChevronRight size={15} className="mt-1"/> Menggunakan alamat yang disimpan</>)} 
      </h5>
      {
        userInfo && (
            <div>
                {
                    user && user.addresses.map((item,index) => {
                        return (
                            <div className="w-full flex">
                                <input type="checkbox" name="" id="" className="mr-3 mt-1"  value={item.addressType} 
                                    onClick={() => setAddress1(item.address1) ||
                                    setAddress2(item.address2) ||
                                    setZipCode(item.zipCode) ||
                                    setCountry(item.country) ||
                                    setCity(item.city) 
                                  
                                  }
                                />
                                <h2>{item.addressType}</h2>
                            </div>
                        )
                    })
                }
            </div>
        )
      }
    </div>
  );
};

const CartData = ({handleSubmit, totalPrice, shipping, subTotalPrice, couponCode, setCouponCode, discountPercentage }) => {
  console.log("diskon :",  discountPercentage)
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Total :</h3>
        <h5 className="text-[18px] font-[600]">Rp. {subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Pajak (10%) :</h3>
        <h5 className="text-[18px] font-[600]">Rp. {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Diskon :</h3>
        <h5 className="text-[18px] font-[600]">- {discountPercentage ? "Rp " + discountPercentage.toString() : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">Rp. {totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Kode Kupon"
          required
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Tambahkan Kode Kupon"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;