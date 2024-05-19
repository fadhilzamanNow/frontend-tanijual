import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateEvent from "../../components/Shop/CreateEvent.jsx"

const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="800px:w-[330px] w-[80px]">
                <DashboardSideBar active={6}/>
            </div>
            <div className='w-full justify-center flex'>
                <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents