import { useState } from "react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { toast } from 'react-hot-toast'

const EventCard = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart || {});
  const [quantity, setQuantity] = useState(1);

  if (!data) return null;

  const imageUrl = data.images?.[0]?.url || data.image_Url?.[0]?.url || (typeof data.image_Url === "string" ? data.image_Url : "");
  const eventName = data.name || "Event";
  const productSlug = encodeURIComponent(eventName.replace(/\s+/g, "-"));

  const handleIncrease = () => {
    if (quantity < data.stock) setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.some((i) => (i._id || i.id) === id);
    if (isItemExists) {
      toast.error("Item already in cart ");
    } else {
      const cartData = { ...data, qty: quantity, quantity };
      dispatch(addToCart(cartData));
      toast.success("Item Added to Cart ! ");
    }
  };
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <Link to={`/product/${productSlug}`}>
            <img
              src={imageUrl}
              alt={eventName}
              className="w-[320px] h-[320px] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <Link to={`/product/${productSlug}`}>
            <h2 className="text-3xl font-bold text-gray-800 hover:text-pink-500 transition-colors">
              {data.name}
            </h2>
          </Link>

          <p className="text-gray-600 mt-4 leading-7">
            {data.description}
          </p>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <span className="text-red-400 line-through text-xl">
              ${data.originalPrice || data.price}
            </span>

            <span className="text-3xl font-bold text-gray-900">
              ${data.discountPrice || data.discount_price}
            </span>

            <span className="ml-auto text-green-500 font-semibold">
              {data.sold_out || data.total_sell || 0} Sold
            </span>
          </div>

          {/* Timer */}
          <div className="mt-7 bg-pink-50 border border-pink-100 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-pink-500 uppercase tracking-wider mb-3">
              Offer Ends In
            </p>

            <CountDown data={data} />
          </div>

          {/* quantity  */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-gray-700 text-sm font-medium">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-sm font-bold text-pink-500 hover:bg-pink-50 transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 text-sm font-semibold text-gray-700">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-sm font-bold text-pink-500 hover:bg-pink-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="px-7 py-3 rounded-lg bg-pink-400 text-white font-semibold hover:bg-pink-500 transition-all duration-300 shadow-md"
              onClick={() => { addToCartHandler(data._id) }}>
              Add To Cart
            </button>

            <Link
              to={`/product/${productSlug}`}
              className="px-7 py-3 rounded-lg border border-pink-400 text-pink-500 font-semibold hover:bg-pink-400 hover:text-white transition-all duration-300"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;