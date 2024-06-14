import React from 'react'
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader"
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar"
import DashboardHero from "./DashboardHero.jsx"
const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashboardSideBar active={1}/>
            </div>
            <DashboardHero/>
        </div>
    </div>
  )
}

export default ShopDashboardPage