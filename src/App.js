
import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage,ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage, CheckoutPage, PaymentPage,OrderSuccessPage, ProfilePage, ShopCreatePage,SellerActivationPage, ShopLoginPage } from "./Routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import {ShopHomePage} from "./ShopRoutes.js" 
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute.js";
export default function App() {
  
  const {loading, isAuthenticated} = useSelector((state) => state.user);
  const {isSeller, seller, isLoading} = useSelector((state) => state.seller)

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    
  },[])

    console.log("seller : ",isSeller,seller, "isLoading :", isLoading)
  return (
    <>
      {
        loading || isLoading ? (null) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element ={<SignUpPage />} />
              <Route path="activation/:activation_token" element = {<ActivationPage />} />
              <Route path="/seller/activation/:activation_token" element = {<SellerActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:name" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order/success/:id" element={<OrderSuccessPage />} />
              <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
              </ProtectedRoute>} />
              <Route path="/shop-create" element={<ShopCreatePage/>} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/shop/:id" element={
                <SellerProtectedRoute isSeller={isSeller}>
                  <ShopHomePage />
                </SellerProtectedRoute>
              } />
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
