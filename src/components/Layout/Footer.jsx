import React from 'react'
import { Link } from 'react-router-dom'

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
        <div className="grid grid-cols-1 sm:gridd-cols-3 lg:gridd-cols-4 gap-6 smLx-8 px-5 py-16 sm:text-center">
            <div>
                <Link to="/" className="flex flex-row text-4xl font-extrabold">
                    <p className="text-green-500">Jual</p>
                    <p className="text-green-200">Tani</p>
                </Link>
                
                
            </div>
        </div>
    </div>
  )
}

export default Footer