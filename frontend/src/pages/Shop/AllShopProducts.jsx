import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import ShowProducts from "../../components/Shop/Layout/ShowProducts.jsx"
const AllShopProducts = () => {
   return (
   <>
   <DashBoardHeader/>
   <div className="flex">

  <DashBoardSideBar
    active="products"
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
     <ShowProducts/>
  </main>

</div>
  
   </>
  )
}

export default AllShopProducts