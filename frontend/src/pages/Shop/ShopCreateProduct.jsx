import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashBoardSideBar from '../../components/Shop/Layout/DashBoardSideBar'
import CreateProduct from "../../components/Shop/CreateProduct.jsx"
const ShopCreateProduct = () => {
  return (
   <>
   <DashBoardHeader/>
   <div className="flex">

  <DashBoardSideBar
    active="dashboard"
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
     <CreateProduct/>
  </main>

</div>
  
   </>
  )
}

export default ShopCreateProduct