import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import sayuranImage from "../Assests/Login/sayuran.jpg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate()
  useEffect(() => {
    if(isAuthenticated === true) {
      navigate("/")
    }
  },[])

  return (
    <>
      
      <div className='w-full h-screen relative' style={{  
        backgroundImage: `url(${sayuranImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} >
{/*       <img src={require('../Assests/Login/sayur-dan-buah.jpg')}  style={{width : "100%", height : "100%" }}/>
 */}      <Login/>
      </div>
    </>
    
  )
}

export default LoginPage
