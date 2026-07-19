import React, { useState, useEffect } from 'react'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'

const BestDeals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const d = productData && [...productData].sort((a, b) => b.total_sell - a.total_sell)
    const firstFive = d.slice(0, 5)
    setData(firstFive)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 relative inline-block after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gray-800 after:mt-1">
          Best Deals
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {data &&
          data.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
      </div>
    </div>
  )
}

export default BestDeals