import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai"

const ProductCard = ({ data, addToCartHandler }) => {
  const [wishlisted, setWishlisted] = useState(false)

  const productName = data?.name || "Product"
  const productSlug = productName.replace(/\s+/g, "-")

  const originalPrice = Number(data?.originalPrice ?? data?.original_price ?? data?.price ?? 0)
  const discountPrice = Number(data?.discountPrice ?? data?.discount_price ?? 0)
  const basePrice = Number(data?.price ?? originalPrice ?? 0)
  const hasDiscount =
    Number.isFinite(discountPrice) && discountPrice > 0 && discountPrice < originalPrice
  const displayPrice = hasDiscount ? discountPrice : originalPrice || basePrice
  const discountPercent =
    hasDiscount && originalPrice > 0
      ? Math.round(((basePrice - discountPrice) / originalPrice) * 100)
      : 0

  const rating = Math.round(data?.ratings || 0)

  return (
    <div className="group relative w-full max-w-[300px] mx-auto bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Image */}
      <Link to={`/product/${productSlug}`} className="block relative">
        <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-gray-50">
          <img
            src={data?.images?.[0]?.url}
            alt={productName}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            -{discountPercent}%
          </span>
        )}

        {/* Desktop hover actions, overlaid on image */}
        <div className="hidden sm:flex absolute top-3 right-3 flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <IconButton
            active={wishlisted}
            label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault()
              setWishlisted((w) => !w)
            }}
          >
            {wishlisted ? (
              <AiFillHeart size={16} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={16} className="text-gray-700" />
            )}
          </IconButton>

          <IconButton label="Quick view" to={`/product/${productSlug}`}>
            <AiOutlineEye size={16} className="text-gray-700" />
          </IconButton>

          <IconButton
            label="Add to cart"
            onClick={(e) => {
              e.preventDefault()
              addToCartHandler?.(data)
            }}
          >
            <AiOutlineShoppingCart size={16} className="text-gray-700" />
          </IconButton>
        </div>
      </Link>

      {/* Body */}
      <div className="p-3 sm:p-4">
        <Link to="/" className="block w-fit">
          <h5 className="text-xs text-gray-500 hover:text-brand-text hover:underline truncate">
            {data?.shop?.name}
          </h5>
        </Link>

        <Link to={`/product/${productSlug}`} className="block">
          <h4
            title={productName}
            className="mt-1 text-sm sm:text-base font-medium text-gray-800 leading-snug line-clamp-2 min-h-[2.5rem]"
          >
            {productName}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-2 text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) =>
              i < rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
            )}
            {data?.reviews?.length ? (
              <span className="ml-1 text-xs text-gray-400">({data.reviews.length})</span>
            ) : null}
          </div>

          {/* Price + sold */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                ${displayPrice}
              </span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ${basePrice}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {data?.sold_out } sold
            </span>
          </div>
        </Link>

        {/* Mobile actions row (always visible, no hover on touch devices) */}
        <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Toggle wishlist"
            className="p-2 -m-2"
          >
            {wishlisted ? (
              <AiFillHeart size={18} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={18} className="text-gray-600" />
            )}
          </button>
          <Link to={`/product/${productSlug}`} className="p-2 -m-2">
            <AiOutlineEye size={18} className="text-gray-600" />
          </Link>
          <button
            onClick={() => addToCartHandler?.(data)}
            aria-label="Add to cart"
            className="p-2 -m-2"
          >
            <AiOutlineShoppingCart size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

const IconButton = ({ children, onClick, label, active, to }) => {
  const className = `w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors ${
    active ? "ring-1 ring-red-200" : ""
  }`

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label} title={label}>
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={className}
    >
      {children}
    </button>
  )
}

export default ProductCard