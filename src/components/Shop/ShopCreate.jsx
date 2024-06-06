import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
const ShopCreate = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [visible,setVisible] = useState(false)
    const [name,setName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState();
    const [adress,setAdress] = useState("");
    const [zipCode,setZipCode] = useState("");
    const [avatar,setAvatar] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {headers : {"Content-Type" : "multipart/form-data"}};

        

        /* newForm.append("file",avatar)
        newForm.append("name", name);
        newForm.append("email",email);
        newForm.append("password",password)
        newForm.append("address",adress)
        newForm.append("zipCode", zipCode);
        newForm.append("phoneNumber", phoneNumber) */
        axios.post(`${server}/shop/create-shop`, {
           name, email, password,avatar, zipCode, adress, phoneNumber
        }).then((res) => {
            toast.success(res.data.message)
            setEmail("");
            setName("");
            setPassword("");
            setAvatar();
            setZipCode();
            setAdress();
            setPhoneNumber()

        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const handleFileInputChange = (e) => {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          if(reader.readyState === 2) {
            setAvatar(reader.result)
          }
        }
    }
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8  top-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-green-200">
        <h2 className="mt-6 text-center text-3xl font-bold">
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-green-200 border">
            <div className="text-center text-[24px] font-[600]">
                Daftar Sebagai Penjual Yuk
            </div>
            <div className="text-center mb-5 text-3xl font-semibold text-green-400 flex flex-row justify-center">
                <div>
                  Jual
                </div>
                <div className="text-green-200 ">
                  Tani
                </div>
            </div>
            
          <form className="space-y-6" onSubmit={handleSubmit} >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Toko
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Nomor 
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  autoComplete="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat 
              </label>
              <div className="mt-1">
                <input
                  type="adress"
                  name="adress"
                  autoComplete="adress"
                  required
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Kode Pos
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  autoComplete="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm "
                />
                {visible ? (
                    <AiOutlineEye 
                        className=" absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                />) : (
                    <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                />
                )}
                
              </div>
            </div>
            <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                </label>
                <div className="mt-2 flex items-center">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                       {
                        avatar ? (
                            <img src={avatar} alt="avatar" className="h-full w-full object-hover rounded-full"/>
                        ) : (
                            <RxAvatar className="h-8 w-8" />
                        )
                       }
                    </span>
                    <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 relative">
                    <span>Masukkan sebuah Gambar</span>
                       <input type="file" name="avatar" id="file-input" accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        className="sr-only"
                       />
                    </label>
                       
                </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                    <input type="checkbox" name="remember-me" id="remember-me" 
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded bg-green-500"
                    />
                    <label 
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                    >
                        Remember Me ? 
                    </label>
                </div>
                <div className="text-sm">
                   <a href=".forgot-password"
                    className="text-green-500 underline"
                   >
                    Lupa Passwordmu ?
                   </a>
                </div>
            </div>
            <div>
                <button type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-blue-600"
                >
                Daftar
                </button>
            </div>
            <div className={`${styles.noramlFlex} text-gray-500`}>
                <h4>Sudah memiliki akun ? </h4>
                <Link to="/shop-login" className="text-green-500 pl-2">
                    Masuk
                </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
