import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Events/EventCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader';
import ProductCard from '../components/Route/ProductCard/ProductCard';

const EventsPage = () => {
    const { allEvents, isLoading } = useSelector((state) => state.events);
    return (
      <>
      {isLoading ? (
          <Loader />
        ) : (
          <div >
            <Header activeHeading={4} />
            <div className="grid grid-cols-[repeat(2,160px)]  justify-evenly gap-[10px] md:grid-cols-[repeat(4,200px)] md:gap-[25px] lg:grid-cols-[repeat(5,160px)] lg:gap-[30px] xl:grid-cols-[repeat(6,180px)] xl:gap-[10px] 2xl:grid-cols-[repeat(7,190px)] 2xl:gap-[10px] mt-1">
            {allEvents &&
              allEvents.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                  toko={true}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

export default EventsPage