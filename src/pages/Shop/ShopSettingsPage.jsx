import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import ShopSettings from "../../components/Shop/Layout/ShopSettings.jsx"

const ShopSettingsPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] bg-white">
            <DashboardSideBar active={11}/>
        </div>
        <div className="w-full justify-center flex">
            <ShopSettings />
        </div>
    </div>
</div>
  )
}

export default ShopSettingsPage