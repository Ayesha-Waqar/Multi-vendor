import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";


const Cart = ({ setOpenCart }) => {

  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "MacBook Pro M3",
      image:
        "https://i.pinimg.com/vwebp/736x/f6/cc/8d/f6cc8d80d11200389d581b991aa3d422.webp",
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

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpenCart(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-gradient-to-b from-pink-50 via-white to-blue-50 shadow-2xl z-50 flex flex-col animate-[slideIn_.3s_ease]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-200 bg-white">
          <h2 className="text-xl font-bold text-blue-400">
            Shopping Cart ({cartItems.length})
          </h2>

          <button
            onClick={() => setOpenCart(false)}
            className="w-10 h-10 rounded-full hover:bg-blue-100 flex items-center justify-center transition text-black"
          >
            <AiOutlineClose size={22} />
          </button>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-2xl font-semibold text-black">Your Cart is Empty 🛒</h2>
            <p className="text-gray-500 mt-2">
              Looks like you haven't added any products yet.
            </p>

            <button
              onClick={() => setOpenCart(false)}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {cartItems.map((item) => (
                <SingleCart
                  key={item.id}
                  item={item}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-blue-200 p-5 bg-white">
              <div className="flex justify-between text-lg font-bold mb-4 text-black">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              <Link to={"/checkout"}>
                <button className="w-full mt-3 border border-blue-300 text-black py-3 rounded-lg hover:bg-blue-200 transition">
                  Proceed to Checkout
                </button>
              </Link>


              <Link to={"/products"}>
                <button
                  onClick={() => {
                    setOpenCart(false)
                  }}
                  className="w-full mt-3 border border-pink-300 text-black py-3 rounded-lg hover:bg-pink-200 transition"
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

export default Cart;

const SingleCart = ({ item, cartItems, setCartItems }) => {
  const increaseQuantity = () => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = () => {
    if (item.quantity === 1) {
      // Remove item completely
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  return (
    <div className="flex gap-4 border border-pink-100 rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover border border-blue-100"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-sm line-clamp-2 text-black">{item.name}</h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.brand} • {item.color}
        </p>

        <p className="text-lg font-bold text-blue-400 mt-2">
          Rs. {item.price.toLocaleString()}
        </p>

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
      </div>
    </div>
  );
};