import React from 'react'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllProducts from "../../components/Shop/AllProducts"
const ShopAllProduct = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex  justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] bg-white">
            <DashboardSideBar active={3}/>
        </div>
        <div className="w-full justify-center flex bg-white mx-[1px]">
            <AllProducts />
        </div>
    </div>
</div>
  )
}

export default ShopAllProduct