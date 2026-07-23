import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import DropDown from "./DropDown";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logo.png";
import NavBar from "./NavBar";
import { useSelector } from "react-redux"
import Cart from "../Cart/Cart.jsx"
import Wishlist from "../Wishlist/Wishlist.jsx"

const Header = ({ activeHeading }) => {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [sticky, setSticky] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCart  , setOpenCart] = useState(false)
  const [openWishlist  , setOpenWishlist] = useState(false)


  const dropdownRef = useRef(null);


  // console.log(user)
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData([]);
      return;
    }

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchData(filteredProducts);
  };

  // Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return ( 
    <header className="w-full">
      {/* Top Header */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-10xl mx-auto px-4 flex flex-wrap items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src={logo}
              alt="Cartsy"
              className="h-9 sm:h-12 md:h-14 w-auto"
            />

          </Link>

          {/* Search - desktop/tablet inline */}
          <div className="hidden md:block relative md:flex-1 md:max-w-lg">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`${styles.input} w-full pr-10 text-sm sm:text-base`}
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            {searchData.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg border shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchData.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/${product.name}`}
                    className="block px-4 py-3 text-sm sm:text-base hover:bg-gray-100 transition"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller Button + Mobile Menu Toggle */}
          <div className="ml-auto md:ml-0 shrink-0 flex items-center gap-2">
            <Link
              to="/seller"
              className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-brand border-2 border-ink px-3 sm:px-4 py-2 text-ink font-semibold hover:bg-brand-dark transition text-sm sm:text-base whitespace-nowrap"
            >
              <span className="font-medium">Become Seller</span>
              <IoIosArrowForward />
            </Link>

            {/* Hamburger icon - mobile/tablet only */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-ink hover:bg-gray-100 transition shrink-0"
            >
              {mobileMenuOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
            </button>
          </div>

          {/* Search - mobile, always its own full-width row */}
          <div className="relative w-full md:hidden">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`${styles.input} w-full pr-10 text-sm`}
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            {searchData.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg border shadow-lg z-50 max-h-72 overflow-y-auto">
                {searchData.map((product, index) => (
                  <Link
                    key={index}
                    to={`/product/${product.name}`}
                    className="block px-4 py-2.5 text-sm hover:bg-gray-100 transition"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div
        className={`bg-accent-light text-ink border-b-2 border-ink/10 transition-all duration-300 ${sticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : ""
          }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:py-0 md:h-16 ${mobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center gap-3 md:gap-0 md:justify-between py-3`}
        >
          {/* Categories */}
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <div
              onClick={() => setDropDown(!dropDown)}
              className="flex h-11 w-full md:w-auto items-center justify-between rounded-full border border-pink-200 bg-white px-4 shadow-sm cursor-pointer transition-all duration-300 hover:border-pink-400 hover:bg-pink-50 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <BiMenuAltLeft className="text-2xl text-pink-500" />
                <span className="text-sm font-semibold text-slate-700">
                  All Categories
                </span>
              </div>

              <IoIosArrowDown
                className={`ml-3 text-lg text-slate-500 transition-transform duration-300 ${dropDown ? "rotate-180" : ""
                  }`}
              />
            </div>

            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* navlinks */}
          <div className="w-full md:w-auto bg-white/70 md:bg-transparent rounded-full md:rounded-none">
            <NavBar
              active={activeHeading}
              onLinkClick={() => setMobileMenuOpen(false)}
            />
          </div>

          {/* Wishlist / Cart / Profile */}
          <div className="flex items-center justify-center md:justify-start gap-5 sm:gap-6 w-full md:w-auto mt-1 pt-3 md:mt-0 md:pt-0 border-t border-ink/10 md:border-none">

            {/* Wishlist */}
            <button
              onClick={() => setOpenWishlist(true)}
              aria-label="Wishlist"
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white transition"
            >
              <AiOutlineHeart size={20} className="sm:hidden" />
              <AiOutlineHeart size={22} className="hidden sm:block" />
              <span className="absolute -top-1 -right-1 bg-brand-dark text-ink text-[10px] leading-none font-bold rounded-full w-4 h-4 flex items-center justify-center border border-ink/20">
                0
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setOpenCart(true)}
              aria-label="Shopping cart"
              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white transition"
            >
              <AiOutlineShoppingCart size={20} className="sm:hidden" />
              <AiOutlineShoppingCart size={22} className="hidden sm:block" />
              <span className="absolute -top-1 -right-1 bg-brand-dark text-ink text-[10px] leading-none font-bold rounded-full w-4 h-4 flex items-center justify-center border border-ink/20">
                0
              </span>
            </button>

          </div>

          {
            openCart && <Cart  setOpenCart={setOpenCart}/>
          }
          {
            openWishlist && <Wishlist setOpenWishlist={setOpenWishlist}/>
          }

          {
            isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={user?.avatar?.url}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-400"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                aria-label="Login"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:underline"
              >
                Login
                <CgProfile size={20} className="sm:hidden" />
                <CgProfile size={22} className="hidden sm:block" />
              </Link>
            )
          }

        </div>
      </div>
    </header>
);

};

export default Header;
