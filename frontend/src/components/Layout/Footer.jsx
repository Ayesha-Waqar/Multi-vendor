import React from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-50 via-white to-blue-50 border-t border-pink-100">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-black">
            Stay Updated 
          </h2>
          <p className="mt-2 text-gray-600">
            Subscribe to receive new arrivals, exclusive offers, and updates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 rounded-xl border border-blue-200 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
          />

          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-7 py-3 rounded-xl transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-pink-100">
        {/* Logo & About */}
        <div>
          <img
            src={logo}
            alt="Crown Market"
            className="w-36 mb-5"
          />

          <p className="text-gray-600 leading-7 text-sm">
            Crown Market brings together trusted sellers so you can shop for
            quality products with confidence.
          </p>

          <div className="flex gap-4 mt-6 text-gray-700">
            <a href="#">
              <AiFillFacebook
                size={24}
                className="hover:text-blue-500 transition cursor-pointer"
              />
            </a>

            <a href="#">
              <AiOutlineTwitter
                size={24}
                className="hover:text-blue-500 transition cursor-pointer"
              />
            </a>

            <a href="#">
              <AiOutlineInstagram
                size={24}
                className="hover:text-pink-500 transition cursor-pointer"
              />
            </a>

            <a href="#">
              <AiOutlineYoutube
                size={24}
                className="hover:text-red-500 transition cursor-pointer"
              />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xl font-bold text-black mb-5">
            Shop
          </h3>

          <ul className="space-y-3">
            {footerProductLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-bold text-black mb-5">
            Company
          </h3>

          <ul className="space-y-3">
            {footercompanyLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-bold text-black mb-5">
            Support
          </h3>

          <ul className="space-y-3">
            {footerSupportLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-black">
              Crown Market
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="text-gray-600 hover:text-pink-500 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-600 hover:text-pink-500 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contact"
              className="text-gray-600 hover:text-pink-500 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;