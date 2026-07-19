/** Legacy layout helpers — simplified for readability */
const styles = {
  custom_container: "w-11/12 hidden sm:block",
  heading: "text-2xl md:text-3xl font-semibold text-gray-900 pb-4",
  section: "w-11/12 max-w-6xl mx-auto py-6 px-2 sm:px-0",
  productTitle: "text-lg font-semibold text-gray-900 leading-snug",
  productDiscountPrice: "text-lg font-bold text-brand-text",
  price: "text-sm text-gray-400 line-through",
  shop_name: "text-sm text-gray-500 mt-1",
  active_indicator: "absolute bottom-0 left-0 h-0.5 w-full bg-accent-dark",
  button:
    "inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink border-2 border-ink hover:bg-brand-dark transition shadow-sm",
  cart_button:
    "px-5 h-11 rounded-full bg-accent border-2 border-ink flex items-center justify-center text-ink font-bold text-sm hover:bg-accent-dark transition",
  cart_button_text: "text-ink text-sm font-bold",
  input:
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-text focus:ring-2 focus:ring-brand/30 outline-none bg-white",
  activeStatus:
    "w-2.5 h-2.5 rounded-full absolute top-0 right-0 bg-green-500 border-2 border-white",
  normalFlex: "flex items-center",
};

export default styles;