import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const CheckoutSteps = ({active}) => {
    
    const {user} = useSelector((state) => state.user);
    const {cart} = useSelector((state) => state.user);


    useEffect(() => {
        window.scrollTo(0,0);
    },[])


    const steps = [
        'Melengkapkan Informasi Pengiriman',
        'Metode Pembayaran',
        'Sukses',
      ];
  return (
    <div className='w-full flex justify-center'>
        {/* <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
               <div className={`${styles.noramlFlex}`}>
                <div className={`${styles.cart_button}`}>
                       <span className={`${styles.cart_button_text}`}>1. Estimasi Biaya</span>
                </div>
                <div className={`${
                    active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                }`} />
               </div>

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        2. Pembayaran
                    </span>
                </div>
               </div>

               <div className={`${styles.noramlFlex}`}>
               <div className={`${
                    active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                    : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                }`} />
                <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        3. Sukses
                    </span>
                </div>
               </div>
        </div> */}
         <Box sx={{ width: '100%' }}>
            <Stepper activeStep={active} alternativeLabel>
                {steps.map((label) => (
                <Step key={label} 
                sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                        color: "green"
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                        color: "#a5a8ad"
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel .MuiStepIcon-text": {
                        color: "#a5a8ad"
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                        color: "gray",
                      

                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                        color: "gray",
                        
                    },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "white"
                    }
                    
                }}
                >
                    <StepLabel >{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
    </div>
  )
}

export default CheckoutSteps