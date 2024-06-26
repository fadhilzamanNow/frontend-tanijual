import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";

import { toast } from "react-toastify";
import styles from "../../../styles/styles";
import { backend_url,server } from "../../../server";
import { loadSeller } from "../../../redux/actions/user";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar,setAvatar] = useState();
  const [name,setName] = useState(seller && seller.name);
  const [description,setDescription] = useState(seller && seller.description ? seller.description : "");
  const [address,setAddress] = useState(seller && seller.address);
  const [phoneNumber,setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode,setZipcode] = useState(seller && seller.zipCode);


  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
  
   
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      if(reader.readyState === 2){
        setAvatar(reader.result)
        axios.put(`${server}/shop/update-shop-avatar`, {avatar : reader.result}, {withCredentials : true}).then((res) => {
          dispatch(loadSeller())
          toast.success("Foto Toko Berhasil di-update");
        }).catch((err) => {
          toast.error("Foto Toko Gagal Untuk di Update");
        })
      }
    }
    

  };

  const updateHandler = async (e) => {
    e.preventDefault();
    
    await axios.put(`${server}/shop/update-seller-info`, {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
    }, {withCredentials: true}).then((res) => {
        toast.success("Informasi Toko telah berhasil diubah!");
        dispatch(loadSeller());
    }).catch((error)=> {
        toast.error(error.response.data.message);
    })
  };



  return (
    <div className="flex flex-col justify-center items-center w-full mt-2 800px:flex-row 800px:al">
  
        <div className="w-[80%] flex items-center justify-center 800px:w-auto 800px:ml-[20px]">
          <div className="relative">
            <img
              src={
                avatar ? `${avatar}` : `${seller?.avatar?.url}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer border-4 800px:w-[300px] 800px:h-[300px]"
            />
            <div className="w-[50px] h-[50px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[10px] 800px:bottom-[15px] 800px:right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
          
        </div>
        <div className="w-[60%] flex items-center justify-center ">
        <form
          aria-aria-required={true}
          className="flex flex-col w-full items-center justify-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-[500]">Nama Toko</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !bg-gray-500 !text-white`}
              required
              readOnly = {true}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-[500]">Deskripsi Toko</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Berikan deskripsi Tokomu"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-[500]">Alamat Toko</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-[500]">Nomor Telefon Toko</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2 font-[500]">Kode Pos Toko</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Simpan Perubahan"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !bg-green-400 !text-white cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
        </div>

    </div>
  );
};

export default ShopSettings;
