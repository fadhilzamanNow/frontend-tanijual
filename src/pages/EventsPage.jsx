import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Events/EventCard'

const EventsPage = () => {
  return (
    <div>
        <Header activeHeading={4}/>
        <div className="w-full h-[70vh] flex items-end ">
            <EventCard active={true}/>
        </div>
    </div>
    

)
}

export default EventsPage