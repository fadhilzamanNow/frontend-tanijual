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
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    
    await axios.put(`${server}/shop/update-shop-avatar`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((res) => {
        dispatch(loadSeller());
        toast.success("Foto Profil telah berhasil di-update")
    }).catch((error) => {
        toast.error(error.response.data.message);
    })

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
    <div className="w-full min-h-screen flex justify-center items-center">
  
        <div className="w-[30%] flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${seller.avatar}`
              }
              alt=""
              className="w-[500px] h-[500px] rounded-full cursor-pointer border-4"
            />
            <div className="w-[50px] h-[50px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[75px]">
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
        <div className="w-[50%] flex items-center ">
        <form
          aria-aria-required={true}
          className="flex flex-col w-full"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Nama Toko</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !bg-gray-500`}
              required
              readOnly = {true}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Deskripsi Toko</label>
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
              <label className="block pb-2">Alamat Toko</label>
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
              <label className="block pb-2">Nomor Telefon Toko</label>
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
              <label className="block pb-2">Kode Pos Toko</label>
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
              value="Ubah Profil Toko"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
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
