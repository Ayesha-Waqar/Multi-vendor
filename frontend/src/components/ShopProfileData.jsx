import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { productData } from "../static/data"
import ProductCard from "../components/Route/ProductCard/ProductCard"

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1)
  const { seller } = useSelector((state) => state.seller)

  const shopProducts = productData?.filter(
    (i) => i.shop?.name === seller?.name
  )

  const tabs = [
    { id: 1, label: "Shop Products" },
    { id: 2, label: "Running Events" },
    { id: 3, label: "Shop Reviews" },
  ]

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-blue-50 pb-3 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`shrink-0 cursor-pointer px-3 sm:px-4 py-2 rounded-lg transition-colors duration-150
              ${active === tab.id
                ? "bg-black text-white"
                : "bg-pink-50 text-black/60 hover:bg-pink-100"
              }`}
          >
            <h5 className="text-xs sm:text-sm font-medium whitespace-nowrap">
              {tab.label}
            </h5>
          </div>
        ))}
        {isOwner && (
          <div className="ml-auto shrink-0">
            <Link to="/dashboard">
              <button className="bg-pink-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-lg shadow-sm hover:bg-pink-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-5 sm:mt-6">
        {active === 1 && (
          shopProducts && shopProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {shopProducts.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-sm text-black/40 py-16 bg-blue-50/40 rounded-xl">
              No products yet
            </div>
          )
        )}

        {active === 2 && (
          <div className="flex items-center justify-center text-sm text-black/40 py-16 bg-blue-50/40 rounded-xl">
            No running events yet
          </div>
        )}

        {active === 3 && (
          <div className="flex items-center justify-center text-sm text-black/40 py-16 bg-pink-50/40 rounded-xl">
            No reviews yet
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopProfileData