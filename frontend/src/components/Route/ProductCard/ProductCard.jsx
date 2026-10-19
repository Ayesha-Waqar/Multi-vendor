import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductCard = ({ data, addToCartHandler }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist || {});
  const { cart } = useSelector((state) => state.cart || {});

  const targetId = data?._id || data?.id;
  const isWishlisted = Boolean(
    wishlist?.some((i) => (i._id || i.id) === targetId)
  );

  const productName = data?.name || "Product";
  const productSlug = encodeURIComponent(productName.replace(/\s+/g, "-"));

  const imageUrl =
    data?.images?.[0]?.url ||
    data?.image_Url?.[0]?.url ||
    (typeof data?.image_Url === "string" ? data.image_Url : "") ||
    (typeof data?.image === "string" ? data.image : "");

  const originalPrice = Number(
    data?.originalPrice ?? data?.original_price ?? data?.price ?? 0
  );
  const discountPrice = Number(data?.discountPrice ?? data?.discount_price ?? 0);
  const basePrice = Number(data?.price ?? originalPrice ?? 0);
  const hasDiscount =
    Number.isFinite(discountPrice) &&
    discountPrice > 0 &&
    discountPrice < originalPrice;
  const displayPrice = hasDiscount ? discountPrice : originalPrice || basePrice;
  const discountPercent =
    hasDiscount && originalPrice > 0
      ? Math.round(((basePrice - discountPrice) / originalPrice) * 100)
      : 0;

  const rating = 4;

  const handleToggleWishlist = (e) => {
    e?.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist(targetId));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist!");
    }
  };

  const handleAddToCart = (e) => {
    e?.preventDefault();
    if (addToCartHandler) {
      addToCartHandler(data);
      return;
    }
    const isItemInCart = cart?.some((i) => (i._id || i.id) === targetId);
    if (isItemInCart) {
      toast.error("Item already in cart!");
    } else {
      dispatch(addToCart({ ...data, qty: 1, quantity: 1 }));
      toast.success("Item added to cart!");
    }
  };

  return (
    <div className="group relative w-full max-w-[300px] mx-auto bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Image */}
      <Link to={`/product/${productSlug}`} className="block relative">
        <div className="aspect-square w-full overflow-hidden rounded-t-xl bg-gray-50 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={productName}
              loading="lazy"
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <AiOutlineShoppingCart size={36} className="text-gray-300" />
          )}
        </div>

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            -{discountPercent}%
          </span>
        )}

        {/* Desktop hover actions, overlaid on image */}
        <div className="hidden sm:flex absolute top-3 right-3 flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <IconButton
            active={isWishlisted}
            label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleToggleWishlist}
          >
            {isWishlisted ? (
              <AiFillHeart size={16} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={16} className="text-gray-700" />
            )}
          </IconButton>

          <IconButton label="Quick view" to={`/product/${productSlug}`}>
            <AiOutlineEye size={16} className="text-gray-700" />
          </IconButton>

          <IconButton label="Add to cart" onClick={handleAddToCart}>
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
              <span className="ml-1 text-xs text-gray-400">
                ({data.reviews.length})
              </span>
            ) : null}
          </div>

          {/* Price + sold */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                Rs. {displayPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  Rs. {basePrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {data?.sold_out || 0} sold
            </span>
          </div>
        </Link>

        {/* Mobile actions row (always visible, no hover on touch devices) */}
        <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label="Toggle wishlist"
            className="p-2 -m-2"
          >
            {isWishlisted ? (
              <AiFillHeart size={18} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={18} className="text-gray-600" />
            )}
          </button>
          <Link
            to={`/product/${productSlug}`}
            aria-label="View product"
            className="p-2 -m-2"
          >
            <AiOutlineEye size={18} className="text-gray-600" />
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="p-2 -m-2"
          >
            <AiOutlineShoppingCart size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ children, onClick, label, active, to }) => {
  const className = `w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors ${
    active ? "ring-1 ring-red-200" : ""
  }`;

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label} title={label}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={className}
    >
      {children}
    </button>
  );
};

export default ProductCard;