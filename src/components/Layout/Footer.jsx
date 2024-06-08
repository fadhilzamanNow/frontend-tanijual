import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";




const Footer = () => {
  return (
    <div className="bg-black text-white mt-5">
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-green-500 py-7">
            <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
                <span className="text-white">Kirimkan saran kalian tentang Kami </span>
            </h1>
            <div className="flex">
                <input type="text" placeholder='Kirimkan pesanmu ...' className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none h-15"/>
                <button className="bg-blue-500 hover:bg-blue-200 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full h-15 sm:mr-5 sm:w-72 ">Kirim</button>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 smLx-8 px-5 py-16 sm:text-center items-center justify-items-center">
            <div>
                <Link to="/" className="flex flex-row text-4xl font-extrabold">
                    <img 
                        src={require("../../Assests/Home/vsdcadvefbefvdwc.png")}
                        className ="h-[300px] w-[300px] object-contain"       
                    />
                </Link>
            </div>
            <div className="flex flex-col gap-y-5 justify-center"> 
                <div className="mb-5">
                    <FaInstagram 
                        color='white'
                        size={30}
                        className="inline mr-5"
                    /> 
                    JualTani
                </div>  
                <div className="mb-5">
                    <CiFacebook 
                        color='white'
                        size={30}
                        className="inline mr-5"
                    /> 
                    JualTani
                </div>            
                <div className="mb-5">
                    <FaYoutube 
                        color='white'
                        size={30}
                        className="inline mr-5"
                    /> 
                    JualTani
                </div>            

                    
            </div>
            <div className='text-white flex flex-col justify-center'>
               
                <a href={"https://drive.usercontent.google.com/download?id=1YsgKTDIZ7E1m1VVQOyCNHN_m9iiewrhi&export=download&authuser=0"} >

                
                <div className="flex items-center">
                <h1 className="text-[20px] font-[500] ">Download Aplikasi JualTani</h1>
                <img src={require("../../Assests/Home/csfvdsdccdsvf.png")} alt="" className='h-[50px] w-[50px] '/>
                </div>
                </a>
                   
               
            </div>
        </div>
    </div>
  )
}

export default Footer