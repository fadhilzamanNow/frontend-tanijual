import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../Assests/animations/Animation-1716530272526.json";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-20 sm:mt-4">
        <CheckoutSteps active={3}/>
      </div>
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Ordermu berhasil 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
