import React from 'react'
import styles from '../../../styles/styles'
import CountDown from "./CountDown.jsx"

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active? "unset" : "mb-12"} lg:flex p-2 mb-2`}>
        <div className="w-full lg:w-[50%] m-auto">
            <img src="https://media.istockphoto.com/id/1403419626/id/foto/apel-fuji-merah-muda-dengan-daun-hijau-terisolasi-di-atas-putih.jpg?s=612x612&w=0&k=20&c=qFv_mDMcWswQE58H2Nr5qEBjq3xaOC_PdhgBkqb-Fng=" alt="" />
        </div>
        <div className="w-full lg:w-[50%] flex flex-col justify-center ">
            <h2 className={`${styles.productTitle}`}>Apel Denmark</h2>
            <p className='text-justify'>
            Apel Denmark, juga dikenal sebagai "Danish Apple," adalah varietas apel yang berasal dari Denmark. Apel ini terkenal dengan rasa manis dan sedikit asam, dengan tekstur yang renyah dan daging buah yang berair. 
            Apel Denmark sering digunakan dalam pembuatan makanan penutup seperti pai, tart, dan saus apel. Selain itu, apel ini juga populer sebagai camilan sehat karena kandungan vitaminnya yang tinggi, terutama vitamin C, serta serat yang baik untuk pencernaan.
            Secara keseluruhan, apel Denmark adalah pilihan yang lezat dan serbaguna, baik untuk konsumsi segar maupun diolah dalam berbagai masakan.
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                        <div className="font-[500] text-[18px] text-red-500 pr-3 line-through">
                            Rp 25.000/kg
                        </div>
                        <div className="font-bold text-[20px] text-black font-Roboto">
                            Rp 20.000/kg
                        </div>
                </div>
                <span className="pr-3 font-[500] text-[17px] text-green-300">
                    50 terjual
                </span>
            </div>
            <div>
                <CountDown />
            </div>
        </div>

    </div>
  )
}

export default EventCard