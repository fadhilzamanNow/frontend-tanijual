import React from 'react'
import Login from '../components/Login/Login'
import sayuranImage from "../Assests/Login/sayuran.jpg"

const LoginPage = () => {

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
