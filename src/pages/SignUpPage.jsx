import React from 'react'
import SignUp from "../components/SignUp/SignUp"
import sayuranImage from "../Assests/Home/vegetable.jpg"

const SignUpPage = () => {
  return (
    <div className='w-full h-screen relative' style={{  
      backgroundImage: `url(${sayuranImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} >
    
    
      <SignUp />
    
    
    </div>
  )
}

export default SignUpPage