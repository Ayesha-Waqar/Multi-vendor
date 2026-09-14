import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import CreateCoupenCodes from "../../components/Shop/CreateCoupenCodes.jsx"
const AllShopEvents = () => {
   return (
   <>
   <DashBoardHeader/>
   <div className="flex">

  <DashBoardSideBar
    active="coupons"
  />

  <main
    className="
      flex-1
      min-w-0

      ml-[64px]
      lg:ml-0

      p-4
      sm:p-6
      lg:p-8
    "
  >
    {/* Dashboard content */}
     <CreateCoupenCodes/>
  </main>

</div>
  
   </>
  )
}

export default AllShopEvents