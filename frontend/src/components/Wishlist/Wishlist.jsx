import { useEffect, useState, useMemo } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";

const STORAGE_KEY = "wishlistItems";

/**
 * Safe extraction of an item's unique identifier.
 * Works seamlessly with backend MongoDB (_id) and mock/static data (id).
 */
const getItemId = (item) => {
  if (!item) return "";
  return item._id || item.id || "";
};

/**
 * Safe extraction of an item's unit price.
 * Fallbacks across discountPrice, discount_price, price, originalPrice.
 */
const getItemPrice = (item) => {
  if (!item) return 0;
  const rawPrice =
    item.discountPrice ??
    item.discount_price ??
    item.price ??
    item.originalPrice ??
    0;
  const num = Number(rawPrice);
  return Number.isFinite(num) ? num : 0;
};

/**
 * Safe extraction of an item's quantity.
 */
const getItemQuantity = (item) => {
  if (!item) return 1;
  const rawQty = Number(item.qty ?? item.quantity ?? 1);
  return Number.isFinite(rawQty) && rawQty >= 1 ? rawQty : 1;
};

/**
 * Safe extraction of an item's image URL.
 */
const getItemImage = (item) => {
  if (!item) return "";
  if (typeof item.image === "string" && item.image.trim()) return item.image;
  if (item.images?.[0]?.url) return item.images[0].url;
  if (typeof item.images?.[0] === "string" && item.images[0].trim()) return item.images[0];
  if (item.image_Url?.[0]?.url) return item.image_Url[0].url;
  if (typeof item.image_Url === "string" && item.image_Url.trim()) return item.image_Url;
  return "";
};

/**
 * Normalize a wishlist item.
 */
const normalizeWishlistItem = (item) => {
  if (!item || typeof item !== "object") return null;
  const id = getItemId(item);
  const qty = getItemQuantity(item);
  const price = getItemPrice(item);
  const image = getItemImage(item);

  return {
    ...item,
    id,
    _id: id,
    qty,
    quantity: qty,
    price,
    discountPrice: item.discountPrice !== undefined ? item.discountPrice : price,
    discount_price: item.discount_price !== undefined ? item.discount_price : price,
    image,
  };
};

/**
 * Safe read from localStorage without crashing.
 */
const loadStoredWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeWishlistItem).filter(Boolean);
  } catch {
    return [];
  }
};

/**
 * Persist wishlist items to localStorage safely.
 */
const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch {
    // Storage unavailable or quota exceeded
  }
};

const SingleWishlist = ({
  item,
  onUpdateQuantity,
  onRemove,
  onAddToCart,
  onCloseWishlist,
}) => {
  const quantity = getItemQuantity(item);
  const price = getItemPrice(item);
  const image = getItemImage(item);
  const productName = item?.name || "Product";
  const productSlug = encodeURIComponent(productName.replace(/\s+/g, "-"));

  const subtitle = useMemo(() => {
    if (item?.brand && item?.color) return `${item.brand} • ${item.color}`;
    if (item?.brand) return item.brand;
    if (item?.color) return item.color;
    if (item?.category) return item.category;
    if (item?.shop?.name) return item.shop.name;
    return "";
  }, [item]);

  return (
    <div className="relative flex gap-4 border border-pink-100 rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition">
      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(item)}
        aria-label="Remove from wishlist"
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-pink-50 hover:bg-red-500 hover:text-white transition flex items-center justify-center text-gray-400"
      >
        <AiOutlineClose size={14} />
      </button>

      {/* Image */}
      <Link
        to={`/product/${productSlug}`}
        onClick={onCloseWishlist}
        className="w-24 h-24 rounded-lg overflow-hidden border border-blue-100 flex-shrink-0 bg-gray-50 flex items-center justify-center"
      >
        {image ? (
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover hover:scale-105 transition"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <AiOutlineHeart size={28} className="text-gray-300" />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 pr-6 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${productSlug}`}
            onClick={onCloseWishlist}
            className="font-semibold text-sm line-clamp-2 text-gray-800 hover:text-blue-500 transition leading-snug"
            title={productName}
          >
            {productName}
          </Link>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {subtitle}
            </p>
          )}

          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-base font-bold text-blue-500">
              Rs. {price.toLocaleString()}
            </span>
            {quantity > 1 && (
              <span className="text-xs text-gray-400">
                (Total: Rs. {(price * quantity).toLocaleString()})
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item, quantity - 1)}
            aria-label="Decrease quantity"
            className="w-7 h-7 rounded border border-pink-200 hover:bg-pink-100 flex items-center justify-center text-gray-700 transition"
          >
            <AiOutlineMinus size={12} />
          </button>

          <span className="font-semibold text-sm text-gray-800 min-w-[1.25rem] text-center">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item, quantity + 1)}
            disabled={Boolean(item.stock && quantity >= item.stock)}
            aria-label="Increase quantity"
            className={`w-7 h-7 rounded border border-blue-200 flex items-center justify-center text-gray-700 transition ${
              item.stock && quantity >= item.stock
                ? "opacity-40 cursor-not-allowed bg-gray-100"
                : "hover:bg-blue-100"
            }`}
          >
            <AiOutlinePlus size={12} />
          </button>

          {item.stock && quantity >= item.stock && (
            <span className="text-[11px] text-red-500 font-medium">
              Max stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          className="mt-3 w-full bg-pink-300 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-xs font-semibold shadow-xs"
        >
          <AiOutlineShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Wishlist = ({ setOpenWishlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxWishlist = useSelector((state) => state?.wishlist?.wishlist);
  const cart = useSelector((state) => state?.cart?.cart);

  const [wishlistItems, setWishlistItems] = useState(() => {
    if (Array.isArray(reduxWishlist) && reduxWishlist.length > 0) {
      return reduxWishlist.map(normalizeWishlistItem).filter(Boolean);
    }
    return loadStoredWishlist();
  });

  // Remove an item from the wishlist
  const handleRemoveItem = (item) => {
    const targetId = getItemId(item);
    if (!targetId) return;

    setWishlistItems((prev) => {
      const updated = prev.filter((c) => getItemId(c) !== targetId);
      saveToStorage(updated);
      return updated;
    });

    dispatch(removeFromWishlist(targetId));
    toast.success("Item removed from wishlist");
  };

  // Update item quantity
  const handleUpdateQuantity = (item, newQty) => {
    const targetId = getItemId(item);
    if (!targetId) return;

    if (newQty <= 0) {
      handleRemoveItem(item);
      return;
    }

    if (item.stock && newQty > item.stock) {
      toast.error(`Only ${item.stock} items available in stock!`);
      return;
    }

    setWishlistItems((prev) => {
      const updated = prev.map((c) => {
        if (getItemId(c) === targetId) {
          return {
            ...c,
            qty: newQty,
            quantity: newQty,
          };
        }
        return c;
      });
      saveToStorage(updated);
      return updated;
    });
  };

  // Add item to cart from wishlist
  const handleAddToCart = (item) => {
    const targetId = getItemId(item);
    const isAlreadyInCart =
      Array.isArray(cart) && cart.some((i) => getItemId(i) === targetId);

    if (isAlreadyInCart) {
      toast.error("Item is already in your cart!");
      return;
    }

    const cartData = {
      ...item,
      qty: getItemQuantity(item),
      quantity: getItemQuantity(item),
    };

    dispatch(addToCart(cartData));
    toast.success("Item added to cart!");
  };

  // Close on Escape + lock background scrolling while drawer is open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenWishlist(false);
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [setOpenWishlist]);

  // Sync across tabs/windows via storage event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        setWishlistItems(loadStoredWishlist());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Total value calculation
  const total = useMemo(
    () =>
      wishlistItems.reduce(
        (acc, item) => acc + getItemPrice(item) * getItemQuantity(item),
        0
      ),
    [wishlistItems]
  );

  const itemCount = useMemo(
    () => wishlistItems.reduce((acc, item) => acc + getItemQuantity(item), 0),
    [wishlistItems]
  );

  const goTo = (path) => {
    setOpenWishlist(false);
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpenWishlist(false)}
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-gradient-to-b from-pink-50 via-white to-blue-50 shadow-2xl z-50 flex flex-col animate-[slideIn_.3s_ease]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-200 bg-white">
          <div className="flex items-center gap-2">
            <AiOutlineHeart size={22} className="text-pink-500" />
            <h2 className="text-lg font-bold text-pink-500">
              Wishlist ({itemCount})
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOpenWishlist(false)}
            aria-label="Close wishlist"
            className="w-10 h-10 rounded-full hover:bg-pink-100 flex items-center justify-center transition text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4 text-pink-400">
              <AiOutlineHeart size={40} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 mt-2 max-w-[260px] text-sm">
              Save your favorite products to your wishlist so you can buy them later.
            </p>

            <button
              type="button"
              onClick={() => goTo("/products")}
              className="mt-6 bg-pink-500 text-white px-7 py-3 rounded-lg font-medium hover:bg-pink-600 active:scale-95 transition shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {wishlistItems.map((item) => (
                <SingleWishlist
                  key={getItemId(item)}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onAddToCart={handleAddToCart}
                  onCloseWishlist={() => setOpenWishlist(false)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-blue-200 p-5 bg-white">
              <div className="flex justify-between items-center text-base font-bold mb-4 text-gray-900">
                <span>Wishlist Total</span>
                <span className="text-lg text-pink-500">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => goTo("/products")}
                className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-lg font-semibold shadow-sm hover:shadow transition active:scale-[0.99]"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </>
  );
};

export default Wishlist;