import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai"
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx"

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false)
  const [open ,setOpen] = useState(false)

  const d = data.name
  const product_name = d.replace(/\s+/g, "-")

  return (
    <div className="w-full max-w-[300px] mx-auto bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-3 relative">
      {/* Image */}
      <Link to={`/product/${product_name}`}>
        <img
          src={data.image_Url[0].url}
          alt={data.name}
          className="w-full h-40 sm:h-48 md:h-52 object-contain rounded-md bg-gray-50"
        />
      </Link>

      {/* Shop name */}
      <Link to="/">
        <h5 className="text-xs sm:text-sm text-accent-text hover:underline mt-2 truncate">
          {data.shop.name}
        </h5>
      </Link>

      {/* Product info */}
      <Link to={`/product/${product_name}`}>
        <h4 className="text-sm sm:text-base font-medium text-gray-800 mt-1 leading-snug">
          {data.name.length > 40 ? data.name.slice(0, 40) + "...." : data.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-2 text-yellow-400 text-sm">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>

        {/* Price + sold */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <h5 className="font-semibold text-gray-900 text-sm sm:text-base">
              {data.price === 0 ? data.price : data.discount_price}$
            </h5>
            {data.price ? (
              <h4 className="text-xs sm:text-sm text-gray-400 line-through">
                {data.price}$
              </h4>
            ) : null}
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {data.total_sell} sold
          </span>
        </div>
      </Link>

      {/* Side options */}
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        {click ? (
          <AiFillHeart
            size={20}
            className="cursor-pointer"
            onClick={() => setClick(!click)}
            color="red"
            title="Remove from Wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={20}
            className="cursor-pointer text-gray-700 hover:text-brand-text transition-colors"
            onClick={() => setClick(!click)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={20}
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          title="Quick view "
        />
        <AiOutlineShoppingCart
        size={20}
        color = "#444"
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
          title="Add to Cart"
        />
        {
          open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null 
        }
      </div>
    </div>
  )
}

export default ProductCard