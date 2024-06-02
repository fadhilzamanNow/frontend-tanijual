import React from 'react'
import TrackOrder from "../components/Profile/TrackOrder"
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useSelector } from 'react-redux'

const TrackOrderPage = () => {

    
  return (
    <div>
        <Header />
        <TrackOrder />
        <Footer />
    </div>
  )
}

export default TrackOrderPage