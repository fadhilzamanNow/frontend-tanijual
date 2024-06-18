import React from 'react'
import styles from '../../../styles/styles'
import EventCard from "./EventCard.jsx"
import { useSelector } from 'react-redux'


const Events = () => {

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
          
          <div className="w-full grid">
            {/* <EventCard data={allEvents && allEvents[0]}/> */}
          </div>
        </div>
        )
      }
   
        
    </div>
  )
}

export default Events