import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from "../../static/data"
import toast from 'react-hot-toast';
import { createProduct } from "../../redux/actions/product"

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller)
  const { isLoading, success, error } = useSelector((state) => state.products)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [images, setImages] = useState([])
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPrice, setDiscountPrice] = useState("")
  const [stock, setStock] = useState("")

  const imageChangeHandler = (e) => {
    const files = Array.from(e.target.files)
    setImages((prev) => [...prev, ...files])
  }

  const removeImageHandler = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

 useEffect(() => {
  // console.log(success , error)
  if (error) {
    toast.error(error);
    dispatch({ type: "clearErrors" });
  }

  if (success) {
    // console.log(success)
    toast.success("Product created");

    setTimeout(() => {
      dispatch({ type: "productCreateReset" });
      navigate("/dashboard-products");
    }, 1500);
  }
}, [dispatch, error, success, navigate]);

  // helper: File object ko base64 string mein convert karta hai
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const base64Images = await Promise.all(
        images.map((img) => fileToBase64(img))
      )

      const productData = {
        name,
        category,
        description,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images: base64Images, // array of base64 strings
      }

      dispatch(createProduct(productData))
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[95vw] sm:w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-blue-100 p-5 sm:p-8">
      <h3 className="text-lg sm:text-xl font-semibold text-black text-center mb-6">
        Create Product
      </h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-5">

        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            required
            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
            required
            rows={4}
            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-blue-500 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
          >
            <option value="" disabled>
              Choose a category
            </option>
            {categoriesData.map((cat, index) => (
              <option value={cat.title} key={index}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-blue-500 mb-1.5">
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter product tags..."
            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
              Original Price
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="0"
              required
              className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-blue-500 mb-1.5">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            required
            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs uppercase tracking-wide font-medium text-blue-500 mb-1.5">
            Upload Images <span className="text-red-500">*</span>
          </label>

          {images && images.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-20 w-20 rounded-lg overflow-hidden border border-blue-100"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageHandler(index)}
                    className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center rounded-full bg-black/60 text-white text-xs leading-none hover:bg-black"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/30 py-6 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
          >
            <span className="text-xs text-black/40">
              {images && images.length > 0
                ? "Click to add more images"
                : "Click to upload images"}
            </span>
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            multiple
            onChange={imageChangeHandler}
            className="hidden"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-black hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 transition-colors duration-150"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  )
}

export default CreateProduct