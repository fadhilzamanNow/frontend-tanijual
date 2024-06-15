import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa6";




const Footer = () => {
  return (
    <div className="bg-black text-white">
        <div className="md:flex md:justify-center md:items-center sm:px-12 px-4 bg-green-500 py-7">
            <h1 className="flex justify-center items-center text-[20px] lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-full">
                <span className="text-white text-center">Ayo, Beli Produk Pertanian Hortikultura Favoritmu Langsung Dari Petaninya </span>
            </h1>
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