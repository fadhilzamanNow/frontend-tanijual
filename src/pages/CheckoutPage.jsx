import React from 'react'
import Header from '../components/Layout/Header'
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from '../components/Layout/Footer';

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <div className="mt-20 sm:mt-0">
          <CheckoutSteps active={1} />
        </div>
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage