import React from 'react'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div
      className={`relative min-h-[120vh] 800px:min-h-[70vh] w-full ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(https://r4.wallpaperflare.com/wallpaper/770/26/351/food-fruits-and-vegetables-wallpaper-74c933c3693529abf6d807d0fbd2c9cd.jpg)`,
        backgroundSize : "center"
       
      }}
    >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1 className={`text=[35px] leading-[1.2] 800px:text-[60px] font-[800] capitalize text-green-600`}>
                    Produk Segar <br/>
                    <p className="text-white">Buah Buahan dan Sayur Sayuran</p>
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[600] text-white text-justify mt-[80px] flex flex-col gap-y-8" >
                <p>
                Nikmati kesegaran alami dari buah-buahan dan sayur-sayuran terbaik, langsung dari sumbernya. Setiap produk dipilih dengan teliti untuk memastikan kualitas dan kesegarannya, memberikan Anda rasa yang luar biasa dan manfaat kesehatan optimal. Temukan kenikmatan sejati dari hasil bumi yang dipanen pada puncak kesegarannya.
                </p>
                <p>
                Buah-buahan segar seperti apel, jeruk, mangga, dan anggur diambil langsung dari kebun terbaik, sementara sayur-sayuran segar seperti brokoli, bayam, dan wortel dipanen setiap hari untuk menjaga kandungan gizinya. Kami berkomitmen untuk menyediakan produk-produk berkualitas tinggi yang tidak hanya lezat tetapi juga menyehatkan.
                </p>
                <p>
                Dengan memastikan setiap langkah dari proses penanaman hingga pengiriman, kami menghadirkan kesegaran yang dapat Anda percayai. Rasakan perbedaan dari produk yang ditanam dengan cinta dan dipanen dengan cermat, semuanya demi memberikan Anda pengalaman terbaik dalam menikmati buah dan sayuran segar.
                </p>
                </p>
                <Link to="/products">
                    <div className={`bg-green-800 flex flex-row justify-center items-center mt-5 w-[200px] h-[80px] rounded-md mb-5`}>
                        <span className="text-white font-[Poppins] text-[18px]">Belanja Sekarang</span>
                    </div>
                </Link>
            </div>
    </div>
  )
}

export default Hero