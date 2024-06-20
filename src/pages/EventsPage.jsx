import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Events/EventCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader';

const EventsPage = () => {
    const { allEvents, isLoading } = useSelector((state) => state.events);
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Header activeHeading={4} />
            <div className="!mt-20 sm:!mt-2">
            <EventCard active={true} data={allEvents && allEvents[0]} />
            </div>
          </div>
        )}
      </>
    );
  };

export default EventsPage