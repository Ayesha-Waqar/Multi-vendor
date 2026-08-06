import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx"
import { HiOutlineCamera } from "react-icons/hi";
import axios from "axios"
import { server } from "../../server"
import toast from "react-hot-toast";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState('')
  const [phoneNo, setPhoneNo] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/shop/create-shop`,
        {
          name,
          email,
          password,
          avatar,
          phoneNumber: phoneNo,
          address,
          zipCode,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data)
      toast.success(data.message);
      navigate("/shop-login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-blue-100 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-pink-100 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(59,130,246,0.12)] grid grid-cols-1 lg:grid-cols-[360px_1fr]">

      {/* Left Side */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-pink-50 to-blue-50 p-8 lg:p-10">
        <div className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-pink-300/40 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-300/30 blur-3xl"></div>

        <div className="relative z-10 flex h-full flex-col">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Create Your Seller Account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Join our marketplace and start growing your business with
              thousands of customers.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {[
              {
                title: "Worldwide Delivery",
                desc: "Reach customers across different locations.",
              },
              {
                title: "Smart Analytics",
                desc: "Track sales and understand your business growth.",
              },
              {
                title: "Easy Management",
                desc: "Manage orders, products and customers effortlessly.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-pink-100 bg-white/70 p-4 backdrop-blur-sm shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* <div className="mt-auto pt-8">
            <p className="text-sm text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/seller-login"
              className="font-semibold text-sky-600 hover:text-pink-500 transition"
            >
              Login →
            </Link>
          </div> */}
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-white p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-sky-100 to-pink-100 flex items-center justify-center shadow-md overflow-hidden">

              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <RxAvatar className="h-16 w-16 text-slate-400" />
              )}

              <label
                htmlFor="file-input"
                className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-sky-500 text-white shadow-lg transition hover:scale-110"
              >
                <HiOutlineCamera />

                <input
                  type="file"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>

            <p className="mt-3 text-xs font-semibold tracking-widest text-slate-500">
              SHOP LOGO
            </p>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <input
              type="text"
              placeholder="Shop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
              required
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
              required
            />

            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
              required
            />

            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-3 pr-10 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-sky-300"
                required
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-500">
                {visible ? (
                  <AiOutlineEye
                    size={22}
                    className="cursor-pointer hover:text-pink-500"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={22}
                    className="cursor-pointer hover:text-pink-500"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
             className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-bold rounded-full text-ink bg-brand border-2 border-ink hover:bg-brand-dark transition duration-150 ease-in-out"
          >
            Register Shop
          </button>

          <div className="text-center">
            <span className="text-slate-500">
              Already have an account?
            </span>

            <Link
              to="/shop-login"
              className="ml-2 font-semibold text-sky-600 hover:text-pink-500"
            >
              Login
            </Link>
          </div>

        </form>
      </div>

    </div>
  </div>
);
}

export default ShopCreate