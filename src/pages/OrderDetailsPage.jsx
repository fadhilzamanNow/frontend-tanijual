import React from 'react'
import { useParams } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UserOrderDetails from "../components/UserOrderDetails.jsx"

const OrderDetailsPage = () => {

    const {id} = useParams();

  return (

    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage