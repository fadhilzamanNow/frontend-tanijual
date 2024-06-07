import React, { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [visible,setVisible] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios.post(`${server}/user/login-user`,{
        email,
        password,
      },{ withCredentials: true }).then((res) => {
        toast.success("Login Berhasil")
        navigate("/")
        window.location.reload(true)
        
        
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8  top-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-green-200">
        <h2 className="mt-6 text-center text-3xl font-bold">
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-green-200 border">
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
                Masuk
                </button>
            </div>
            <div className={`${styles.noramlFlex} text-gray-500`}>
                <h4>Belum memiliki akun ? </h4>
                <Link to="/sign-up" className="text-green-500 pl-2">
                    Buat Akun
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
