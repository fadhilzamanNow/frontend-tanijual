import React from 'react'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import AllOrders from "../../components/Shop/AllOrders"
const ShopAllOrders = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex  justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] bg-white">
            <DashboardSideBar active={2}/>
        </div>
        <div className="w-full justify-center flex bg-white mx-[20px]">
            <AllOrders />
        </div>
    </div>
</div>
  )
}

export default ShopAllOrders