
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage,ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, ProductDetailsPage, CheckoutPage, PaymentPage,OrderSuccessPage, ProfilePage, ShopCreatePage,SellerActivationPage, ShopLoginPage } from "./routes/Routes.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import {ShopHomePage} from "./ShopRoutes.js" 
import { ShopDashboardPage, ShopCreateProduct , ShopAllProducts, ShopCreateEvents, ShopAllEvents, ShopAllCoupons,ShopPreviewPage } from "./routes/ShopRoutes.js";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
export default function App() {
  
  

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    
  },[])

  return (
  
      
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
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="/profile" element={
              <ProtectedRoute >
                  <ProfilePage />
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
              <Route path="/dashboard-create-product" element={
                <SellerProtectedRoute >
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              } />
               <Route path="/dashboard-products" element={
                <SellerProtectedRoute >
                  <ShopAllProducts />
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
