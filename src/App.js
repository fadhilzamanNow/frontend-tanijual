
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage, SignUpPage,ActivationPage } from "./Routes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { server } from "./server";
import axios from "axios";
import { toast } from "react-toastify";

export default function App() {
  useEffect(() => {
    axios.get(`${server}/user/getuser`,{withCredentials : true}).then((res) => {
      console.log(res.data);
      toast.success(res.data.message);
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element ={<SignUpPage />} />
        <Route path="activation/:activation_token" element = {<ActivationPage />} />
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
