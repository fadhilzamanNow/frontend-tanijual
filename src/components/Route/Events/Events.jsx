import React from 'react'
import styles from '../../../styles/styles'
import EventCard from "./EventCard.jsx"
import { useSelector } from 'react-redux'
import { Button, Carousel } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

const Events = () => {
  const navigate= useNavigate()
  const {allEvents, isLoading} = useSelector((state) => state.events)
  console.log(allEvents);
  return (
    <div className='mt-10'>
      {
        isLoading ? (null) : (
          <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
           <h1>Produk Terlaris</h1>
          </div>
          
          
            {/* <EventCard data={allEvents && allEvents[0]}/> */}
            <div className="w-full flex justify-center">

            
            <div className=" 200px:h-80 sm:h-84 sm:h-80 w-full">
              <Carousel pauseOnHover={false} slide={false}>
                
                <div className='bg-green-400 w-full h-full flex justify-between items-center font-Poppins' onClick={() => navigate("/events")}>
                    <div className="text-[40px] sm:text-[68px] md:text-[84px] lg:text-[102px] xl:text-[110px] xl:w-[50%] 2xl:text-[140px] 2xl:w-[50%] xl:mt-0 font-[600]  text-white w-[50%] text-center">
                        Buah Banjir
                    </div>
                    <div className=" w-[50%] flex justify-center">
                      <img src={require("../../../Assests/Home/fruit.png")} alt=""  className="h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] lg:h-[375px] lg:w-[375px] "/>
                    </div>
                </div>
                <div className="bg-yellow-900  w-full h-full flex justify-around items-center font-Poppins" onClick={() => navigate("/events")}>
                  <h1 className="text-[40px] sm:text-[68px] md:text-[84px] lg:text-[102px] xl:text-[110px] xl:w-[50%] 2xl:text-[140px] 2xl:w-[50%] xl:mt-0 font-[600]  text-white w-[50%] text-center">
                      Pupuk Murah
                  </h1>
                  <div className="w-[50%] flex justify-center">
                  <img src={require("../../../Assests/Home/fertilizer.png")} alt=""  className="h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] "/>
                  </div>
                </div>
                <div className="bg-yellow-300 w-full h-full flex justify-around items-center font-Poppins" onClick={() => navigate("/events")}>
                  <h1 className="text-[40px] sm:text-[68px] md:text-[84px] lg:text-[102px] xl:text-[110px] xl:w-[50%] 2xl:text-[140px] 2xl:w-[50%] xl:mt-0 font-[600]  text-white w-[50%] text-center">
                      Beras Mantap
                  </h1>
                  <div className="mr-10">
                  <img src={require("../../../Assests/Home/seed-bag.png")} alt=""  className="h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] "/>
                  </div>
                </div>
                
              </Carousel>
              </div>
            </div>
          </div>
        
        )
      }
   
        
    </div>
  )
}

export default Events