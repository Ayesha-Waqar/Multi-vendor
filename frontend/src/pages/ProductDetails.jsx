import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/event";
import { getAllProducts } from "../redux/actions/product";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";

import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";

const StarRating = ({ rating }) => {
  const stars = [];
  const rounded = Math.round(rating || 0);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rounded ? (
        <AiFillStar key={i} className="text-amber-400 text-sm" />
      ) : (
        <AiOutlineStar key={i} className="text-amber-400 text-sm" />
      )
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const ProductNotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-blue-50 px-4">
    <div className="bg-white rounded-2xl shadow-md p-6 text-center max-w-xs w-full">
      <div className="text-4xl mb-3">🔍</div>
      <h1 className="text-lg font-bold text-gray-800 mb-1">
        Product Not Found
      </h1>
      <p className="text-gray-500 text-sm mb-4">
        Sorry, we couldn't find this product. It may have been removed or the
        link is incorrect.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 rounded-full bg-pink-400 hover:bg-pink-500 text-white text-sm font-semibold shadow-sm transition-all"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

const getSellerAvatarSrc = (shop) => {
  if (!shop) return "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
  const avatarObj = shop.avatar || shop.shop_avatar;
  if (typeof avatarObj === "string") return avatarObj;
  if (avatarObj?.url) return avatarObj.url;
  return "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
};

/* ---------------- Product Details / Reviews / Seller Info Tabs ---------------- */
const ProductInfoTabs = ({ product, relatedCount }) => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { key: "details", label: "Product Details" },
    { key: "reviews", label: "Product Reviews" },
    { key: "seller", label: "Seller Information" },
  ];

  const joinedDate = product.shop?.createdAt
    ? new Date(product.shop.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  const totalProducts =
    product.shop?.total_products ?? relatedCount ?? 0;

  const totalReviews =
    product.shop?.total_reviews ?? product.reviews?.length ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm mt-5 overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 sm:flex-none px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-gray-800"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-pink-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === "details" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 sm:w-56 flex-shrink-0">
              <img
                src={getSellerAvatarSrc(product.shop)}
                alt={product.shop?.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-100 shadow-sm"
              />
              <div>
                <h4 className="font-semibold text-blue-500 text-sm">
                  {product.shop?.name}
                </h4>
                <div className="flex items-center gap-1">
                  <StarRating rating={product.shop?.ratings} />
                  <span className="text-gray-400 text-xs">
                    ({(product.shop?.ratings || 0).toFixed(1)})
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {product.reviews && product.reviews.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {product.reviews.map((review, idx) => (
                  <li
                    key={idx}
                    className="bg-pink-50/60 rounded-xl p-3 flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-gray-700 text-xs font-semibold">
                        {review.user || "Anonymous"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-xs sm:text-sm">
                  No reviews yet for this product.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "seller" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={getSellerAvatarSrc(product.shop)}
                alt={product.shop?.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {product.shop?.name}
                </h4>
                <div className="flex items-center gap-1">
                  <StarRating rating={product.shop?.ratings} />
                  <span className="text-gray-400 text-xs">
                    ({(product.shop?.ratings || 0).toFixed(1)}) Ratings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              <p className="text-gray-700">
                Joined On:{" "}
                <span className="font-semibold text-gray-800">
                  {joinedDate}
                </span>
              </p>
              <p className="text-gray-700">
                Total Products:{" "}
                <span className="font-semibold text-gray-800">
                  {totalProducts}
                </span>
              </p>
              <p className="text-gray-700">
                Total Reviews:{" "}
                <span className="font-semibold text-gray-800">
                  {totalReviews}
                </span>
              </p>
            </div>

            <Link
              to={`/shop/${product.shop?._id || product.shopId || product.id}`}
              className="inline-block text-center bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-full shadow-sm transition-all"
            >
              Visit Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
/* ------------------------------------------------------------------------------- */

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products || {});
  const { allEvents, events } = useSelector((state) => state.events || {});

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  useEffect(() => {
    if (!allEvents || allEvents.length === 0) {
      dispatch(getAllEvents());
    }
  }, [dispatch, allEvents]);

  const product = useMemo(() => {
    const rawSlug = slug || "";
    let decoded = rawSlug;
    try {
      decoded = decodeURIComponent(rawSlug).trim();
    } catch (e) {
      decoded = rawSlug.trim();
    }

    const eventsList = [...(allEvents || []), ...(events || [])];
    const productsList = [...(allProducts || [])];

    const matchItem = (item) => {
      if (!item) return false;
      const itemName = (item.name || "").trim();
      const dashSlug = itemName.replace(/\s+/g, "-");

      return (
        itemName === decoded ||
        dashSlug === rawSlug ||
        dashSlug === decoded ||
        item._id === rawSlug ||
        item._id === decoded ||
        itemName.toLowerCase() === decoded.toLowerCase() ||
        dashSlug.toLowerCase() === rawSlug.toLowerCase() ||
        dashSlug.toLowerCase() === decoded.toLowerCase()
      );
    };

    // 1. Search in Redux allEvents & events
    const eventMatch = eventsList.find(matchItem);
    if (eventMatch) return eventMatch;

    // 2. Search in Redux allProducts
    const prodMatch = productsList.find(matchItem);

    if (prodMatch) return prodMatch;

    return null;
  }, [slug, allEvents, events, allProducts]);

  const images = product
    ? Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : Array.isArray(product.image_Url)
      ? product.image_Url
      : [product.images || product.image_Url].filter(Boolean)
    : [];

  const getImgSrc = (img) => (typeof img === "string" ? img : img?.url);

  const [mainImage, setMainImage] = useState(getImgSrc(images[0]) || "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(getImgSrc(images[0]) || "");
      setQuantity(1);
      setWishlisted(false); // optional
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (!product) {
    return <ProductNotFound />;
  }

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const origPrice = product.originalPrice || product.price || 0;
  const discPrice = product.discountPrice || product.discount_price || 0;
  const hasDiscount = discPrice > 0 && origPrice > discPrice;

  const discountPercent = hasDiscount
    ? Math.round(((origPrice - discPrice) / origPrice) * 100)
    : 0;

  const relatedProducts = (allProducts || [])
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-pink-50 via-white to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 py-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-4">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-pink-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  to={`/products?category=${product.category}`}
                  className="hover:text-pink-500 transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-700 font-medium truncate max-w-[160px]">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Product Images */}
            <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4">
              <div className="w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>

              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 justify-center">
                {images.map((img, idx) => {
                  const src = getImgSrc(img);
                  return (
                    <button
                      key={idx}
                      onClick={() => setMainImage(src)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === src
                          ? "border-pink-400 shadow-sm"
                          : "border-transparent hover:border-blue-200"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col gap-2.5">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-xs">
                <StarRating rating={product.rating || product.ratings} />
                <span className="text-gray-500">
                  ({(product.rating || product.ratings || 0).toFixed(1)})
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">
                  {product.sold_out || product.total_sell || 0} sold
                </span>
              </div>

              <div className="flex items-end gap-2 flex-wrap">
                <span className="text-xl font-bold text-pink-500">
                  ${discPrice > 0 ? discPrice : origPrice}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${origPrice}
                    </span>
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <div>
                {product.stock > 0 ? (
                  <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-block text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mt-1">
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-pink-400 hover:bg-pink-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-full shadow-sm transition-all"
                >
                  <AiOutlineShoppingCart className="text-base" />
                  Add to Cart
                </button>
                <button
                  disabled={product.stock === 0}
                  className="flex-1 bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 rounded-full shadow-sm transition-all"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-pink-200 hover:bg-pink-50 transition-all shadow-sm self-center sm:self-auto"
                >
                  {wishlisted ? (
                    <AiFillHeart className="text-lg text-pink-500" />
                  ) : (
                    <AiOutlineHeart className="text-lg text-pink-400" />
                  )}
                </button>
              </div>

              {/* Shop Card */}
              <div className="mt-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <img
                    src={getSellerAvatarSrc(product.shop)}
                    alt={product.shop?.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {product.shop?.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <StarRating rating={product.shop?.ratings} />
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 bg-white hover:bg-pink-50 text-pink-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm border border-pink-200 transition-all">
                  <AiOutlineMessage className="text-sm" />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Product Details / Reviews / Seller Information Tabs */}
          <ProductInfoTabs product={product} relatedCount={relatedProducts.length} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
                Related Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {relatedProducts.map((item) => (
                  <ProductCard data={item} key={item._id} />
                ))}
              </div>
            </div>
          )}

          {/* Footer Spacing */}
          <div className="h-10"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;