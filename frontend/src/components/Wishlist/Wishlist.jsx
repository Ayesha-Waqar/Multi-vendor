import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const [wishlistItems, setwishlistItems] = useState([
    {
      id: 1,
      name: "MacBook Pro M3",
      image:
        "https://i.pinimg.com/736x/f6/cc/8d/f6cc8d80d11200389d581b991aa3d422.jpg",
      price: 249999,
      quantity: 1,
      color: "Silver",
      brand: "Apple",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      price: 89999,
      quantity: 2,
      color: "Black",
      brand: "Sony",
    },
    {
      id: 3,
      name: "Samsung Galaxy S25",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      price: 199999,
      quantity: 1,
      color: "Blue",
      brand: "Samsung",
    },
  ]);

  const total = wishlistItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpenWishlist(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-gradient-to-b from-pink-50 via-white to-blue-50 shadow-2xl z-50 flex flex-col animate-[slideIn_.3s_ease]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-200 bg-white">
          <h2 className="text-xl font-bold text-blue-400">
            Wishlist ({wishlistItems.length})
          </h2>

          <button
            onClick={() => setOpenWishlist(false)}
            className="w-10 h-10 rounded-full hover:bg-blue-100 flex items-center justify-center transition text-black"
          >
            <AiOutlineClose size={22} />
          </button>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-2xl font-semibold text-blue-400">
              Your Wishlist is Empty 🛍️
            </h2>

            <p className="text-pink-500 mt-2">
              Looks like you haven't added any products yet.
            </p>

            <button
              onClick={() => setOpenWishlist(false)}
              className="mt-6 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {wishlistItems.map((item) => (
                <SingleWishlist
                  key={item.id}
                  item={item}
                  wishlistItems={wishlistItems}
                  setwishlistItems={setwishlistItems}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-blue-200 p-5 bg-white">
              <div className="flex justify-between text-lg font-bold mb-4 text-black">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              {/* <Link to="/checkout">
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-semibold">
                  Proceed to Checkout
                </button>
              </Link> */}

              <Link to="/products">
                <button
                  onClick={() => setOpenWishlist(false)}
                  className="w-full bg-pink-300 text-white py-3 rounded-lg hover:bg-blue-400 transition font-semibold"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Wishlist;

const SingleWishlist = ({
  item,
  wishlistItems,
  setwishlistItems,
}) => {
  // Remove Item
  const removeItem = () => {
    setwishlistItems(
      wishlistItems.filter(
        (wishlistItem) => wishlistItem.id !== item.id
      )
    );
  };

  // Placeholder for Cart Functionality
  const addToCart = () => {
    console.log("Add to Cart:", item);

    // Write your cart functionality here later
    // Example:
    // dispatch(addToCart(item))
    // or
    // axios.post(...)
  };

  // Increase Quantity
  const increaseQuantity = () => {
    setwishlistItems(
      wishlistItems.map((wishlistItem) =>
        wishlistItem.id === item.id
          ? {
              ...wishlistItem,
              quantity: wishlistItem.quantity + 1,
            }
          : wishlistItem
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = () => {
    if (item.quantity === 1) {
      removeItem();
    } else {
      setwishlistItems(
        wishlistItems.map((wishlistItem) =>
          wishlistItem.id === item.id
            ? {
                ...wishlistItem,
                quantity: wishlistItem.quantity - 1,
              }
            : wishlistItem
        )
      );
    }
  };

  return (
    <div className="relative flex gap-4 border border-pink-100 rounded-xl p-3 shadow-sm hover:shadow-md transition bg-white">
      {/* Remove Button */}
      <button
        onClick={removeItem}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-pink-50 shadow-md hover:bg-pink-400 hover:text-white transition flex items-center justify-center text-black"
      >
        <AiOutlineClose size={16} />
      </button>

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover border border-blue-100"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm line-clamp-2 pr-8 text-black">
          {item.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.brand} • {item.color}
        </p>

        <p className="text-lg font-bold text-blue-400 mt-2">
          Rs. {item.price.toLocaleString()}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={decreaseQuantity}
            className="w-8 h-8 rounded border border-pink-200 hover:bg-pink-100 flex items-center justify-center text-black"
          >
            <AiOutlineMinus size={14} />
          </button>

          <span className="font-semibold text-black">{item.quantity}</span>

          <button
            onClick={increaseQuantity}
            className="w-8 h-8 rounded border border-blue-200 hover:bg-blue-100 flex items-center justify-center text-black"
          >
            <AiOutlinePlus size={14} />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={addToCart}
          className="mt-4 w-full bg-pink-300 text-white py-2.5 rounded-lg hover:bg-blue-400 transition flex items-center justify-center gap-2 font-medium"
        >
          <AiOutlineShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};