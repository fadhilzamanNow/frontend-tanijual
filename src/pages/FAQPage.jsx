import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/actions/product'

const FAQPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
     },[])
  return (
    <div>
        <Header activeHeading={5}/>
        <Faq />
        <Footer />
    </div>
  )
}


const Faq = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if(activeTab === tab){
            setActiveTab(0)
        }
        else{
            setActiveTab(tab)
        }

    }
    console.log(activeTab)


    return (
        <div className={`${styles.section} my-8 h-screen mt-20 sm:mt-2`}>
            <h2 className="text-3xl font-boldd text-gray-900 mb-8">FAQ</h2>
                <div className="mx-auto space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                        <button className="flex items-center justify-between w-full" onClick={() => toggleTab(1)}>
                            <span className="text-lg font-medium text-gray-900">
                                    Gimanaa caranya belanja di JualTani ? 
                            </span>
                            {
                                activeTab === 1 ? (
                                    <svg 
                                        className="h-6 w-6 text-gray-500"
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                )
                            }
                           
                        </button>
                        {
                                activeTab === 1 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            Gampang aja kalian hanya perlu cari barang kalian di bagian Produk, terus masukin ke keranjang
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <button className="flex items-center justify-between w-full" onClick={() => toggleTab(2)}>
                            <span className="text-lg font-medium text-gray-900">
                                    Apa sih tujuan JualTani
                            </span>
                            {
                                activeTab === 2 ? (
                                    <svg 
                                        className="h-6 w-6 text-gray-500"
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                )
                            }
                           
                        </button>
                        {
                                activeTab === 2 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">
                                            JualTani berperan sebagai pasar yang dapat digunakan oleh petani untuk menjual hasil pertanian mereka tanpa campur tangan tengkulak
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <button className="flex items-center justify-between w-full" onClick={() => toggleTab(3)}>
                            <span className="text-lg font-medium text-gray-900">
                                    Siapa sih membuat Web JualTani
                            </span>
                            {
                                activeTab === 2 ? (
                                    <svg 
                                        className="h-6 w-6 text-gray-500"
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                )
                            }
                           
                        </button>
                        {
                                activeTab === 3 && (
                                    <div className="mt-4">
                                        <p className="text-base text-gray-500">                         
                                            JualTani dibuat oleh Tim Capstone D Kelompok 4 Mahasiswa Teknik Elektro Angkatan 2021 Universitas Jenderal Soedirman
                                        </p>
                                        <p className="text-base text-gray-500">                         
                                            Rudi Tri Setyadi H1A021029
                                        </p>
                                        <p className="text-base text-gray-500">                         
                                            Ferry Amaludin H1A021036
                                        </p>
                                        <p className="text-base text-gray-500">                         
                                            Muhammad Ilham Isfadhillah H1A021066
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                </div>
        </div>
    )



}

export default FAQPage