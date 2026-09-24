import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../components/Route/ProductCard/ProductCard"
import { getProducts } from '../redux/actions/product'
import { getEvents } from '../redux/actions/event'

const ShopProfileData = ({ shopData }) => {
  const [active, setActive] = useState(1)
  const { seller, isSeller } = useSelector((state) => state.seller)
  const isOwner = isSeller && seller?._id === shopData?._id;
  //  console.log(isOwner)
  //get products 

  // console.log(shopData)
  const dispatch = useDispatch();

  const { products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts(shopData?._id)
    );
  }, [dispatch, shopData?._id]);

  //get shop events 
  const { events } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(getEvents(shopData?._id));
  }, [dispatch, shopData?._id]);



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
          products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((i, index) => (
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
          events && events.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {events.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-sm text-black/40 py-16 bg-blue-50/40 rounded-xl">
              No events yet
            </div>
          )
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

