
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage,ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage } from "./Routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
export default function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  },[])
  const {loading} = useSelector((state) => state.user);

  return (
    <>
      {
        loading === true? (null) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element ={<SignUpPage />} />
              <Route path="activation/:activation_token" element = {<ActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            
            />
      </BrowserRouter>
        )
      }
    </>
      
  )
}
