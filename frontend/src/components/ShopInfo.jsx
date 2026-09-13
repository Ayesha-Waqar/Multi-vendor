import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import axios from "axios"
import {server} from "../server"

const ShopInfo = ({ isOwner }) => {

  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller)
  // console.log("selllerr" , seller)

  const handleLogout = async () => {
    try {
      // console.log("try")
      const { data } = await axios.get(`${server}/shop/logout`, { withCredentials: true })
      console.log("data" , data)
      if (data.success) {
        toast.success(data.message);
         navigate("/");
      // window.location.reload(true)
      }
     
    } catch (err) {
      // console.log("logout")
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="w-full  mx-auto bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-100 to-blue-100 px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <img
          src={seller?.avatar?.url}
          alt={seller?.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-sm"
        />
        <h3 className="mt-4 text-lg sm:text-xl font-semibold text-black">
          {seller.name}
        </h3>
        <p className="mt-1 text-sm text-black/60 px-2">
          {seller.description}
        </p>
      </div>

      {/* Details */}
      <div className="divide-y divide-blue-50">

        <div className="px-6 py-4">
          <h5 className="text-xs uppercase tracking-wide font-medium text-pink-500">
            Address
          </h5>
          <h4 className="mt-1 text-sm sm:text-base text-black">
            {seller.address}
          </h4>
        </div>

        <div className="px-6 py-4">
          <h5 className="text-xs uppercase tracking-wide font-medium text-pink-500">
            Phone Number
          </h5>
          <h4 className="mt-1 text-sm sm:text-base text-black">
            {seller.phoneNumber}
          </h4>
        </div>

        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h5 className="text-xs uppercase tracking-wide font-medium text-blue-500">
              Total Products
            </h5>
            <h4 className="mt-1 text-sm sm:text-base text-black">
              10 {/* make dynamic */}
            </h4>
          </div>
          <div className="text-right">
            <h5 className="text-xs uppercase tracking-wide font-medium text-blue-500">
              Shop Ratings
            </h5>
            <h4 className="mt-1 text-sm sm:text-base text-black">
              4 {/* make dynamic */}
            </h4>
          </div>
        </div>

        <div className="px-6 py-4">
          <h5 className="text-xs uppercase tracking-wide font-medium text-pink-500">
            Joined On
          </h5>
          <h4 className="mt-1 text-sm sm:text-base text-black">
            {seller.createdAt.slice(0, 10)}
          </h4>
        </div>
      </div>

      {/* Actions */}
      {isOwner && (
        <div className="px-6 py-5 flex flex-col sm:flex-row gap-3 bg-black/[0.02]">
          <button
            className="flex-1 rounded-lg bg-pink-200 hover:bg-pink-300 text-black text-sm font-medium py-2.5 transition-colors duration-150"
          >
            Edit Shop
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 rounded-lg bg-black hover:bg-black/80 text-white text-sm font-medium py-2.5 transition-colors duration-150"
          >
            Logout Shop
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopInfo