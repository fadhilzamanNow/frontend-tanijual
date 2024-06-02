import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import Footer from '../../components/Layout/Footer';
import OrderDetails from "../../components/Shop/OrderDetails.jsx"

const ShopOrderDetails = () => {
    const params = useParams();


  return (
    <div>
        <DashboardHeader />
        <OrderDetails />
        <Footer />
    </div>

  )
}

export default ShopOrderDetails