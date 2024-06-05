
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage,ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage, CheckoutPage, PaymentPage,OrderSuccessPage, ProfilePage, ShopCreatePage,SellerActivationPage, ShopLoginPage, OrderDetailsPage, TrackOrderPage,UserInbox } from "./routes/Routes.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import {ShopHomePage} from "./ShopRoutes.js" 
import { ShopDashboardPage, ShopCreateProduct , ShopAllProducts, ShopCreateEvents, ShopAllEvents, ShopAllCoupons,ShopPreviewPage, ShopAllOrders,ShopOrderDetails, ShopAllRefunds,ShopInboxPage,ShopSettingsPage,ShopWithdrawMoneyPage } from "./routes/ShopRoutes.js";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import axios from "axios";
import { server } from "./server.js";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
export default function App() {
  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApikey(){
    const {data} = await axios.get(`${server}/payment/stripeapikey`)
    setStripeApiKey(data.stripeApikey);
  }
  

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
    
  },[])

  console.log(stripeApiKey);

  return (
  
      
          <BrowserRouter>
          {
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Routes>
                <Route path="/payment" element={
                <ProtectedRoute>
                    <PaymentPage />
                </ProtectedRoute>} />
                </Routes>
              </Elements>
            )
          }
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
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/order/success" element={<OrderSuccessPage />} />
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="/profile" element={
              <ProtectedRoute >
                  <ProfilePage />
              </ProtectedRoute>} />
              <Route path="/inbox" element={
              <ProtectedRoute >
                  <UserInbox />
              </ProtectedRoute>} />
              <Route path="/user/order/:id" element={
              <ProtectedRoute >
                  <OrderDetailsPage />
              </ProtectedRoute>} />
              <Route path="/user/track/order/:id" element={
              <ProtectedRoute >
                  <TrackOrderPage />
              </ProtectedRoute>} />
              <Route path="/shop-create" element={<ShopCreatePage/>} />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route path="/shop/:id" element={
                <SellerProtectedRoute >
                  <ShopHomePage />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <SellerProtectedRoute >
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard-messages" element={
                <SellerProtectedRoute >
                  <ShopInboxPage />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard-create-product" element={
                <SellerProtectedRoute >
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard-refunds" element={
                <SellerProtectedRoute >
                  <ShopAllRefunds />
                </SellerProtectedRoute>
              } />
              <Route path="/order/:id" element={
                <SellerProtectedRoute >
                  <ShopOrderDetails />
                </SellerProtectedRoute>
              } />
               <Route path="/dashboard-products" element={
                <SellerProtectedRoute >
                  <ShopAllProducts />
                </SellerProtectedRoute>
              } />
               <Route path="/dashboard-orders" element={
                <SellerProtectedRoute >
                  <ShopAllOrders />
                </SellerProtectedRoute>
              } />
               <Route path="/dashboard-create-event" element={
                <SellerProtectedRoute >
                  <ShopCreateEvents />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard-events" element={
                <SellerProtectedRoute >
                  <ShopAllEvents />
                </SellerProtectedRoute>
              } />
              <Route path="/dashboard-coupons" element={
                <SellerProtectedRoute >
                  <ShopAllCoupons />
                </SellerProtectedRoute>
              } />
              <Route
              path="/settings"
              element={
                <SellerProtectedRoute>
                  <ShopSettingsPage />
                </SellerProtectedRoute>
              }
            />
            <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithdrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
            
              
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
