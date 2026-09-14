import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { createCoupens } from "../../redux/actions/coupens"

const CreateEvent = () => {
    const { seller } = useSelector((state) => state.seller)
    const { isLoading, success, error } = useSelector((state) => state.coupencodes)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [value, setValue] = useState("")


    useEffect(() => {
        // console.log(success , error)
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }

        if (success) {
            // console.log(success)
            toast.success("Coupen Code Generated");

            setTimeout(() => {
                dispatch({ type: "CoupenCreateReset" });
                navigate("/dashboard");
            }, 1500);
        }
    }, [dispatch, error, success, navigate]);

    
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const coupenCodeData = {
                name,
                shopId: seller._id,
                value
            }

            dispatch(createCoupens(coupenCodeData))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-[95vw] sm:w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-blue-100 p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-black text-center mb-6">
                Create Coupen Code
            </h3>

            <form onSubmit={submitHandler} className="flex flex-col gap-5">

                {/* Name */}
                <div>
                    <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
                        Coupen Code  Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your event name..."
                        required
                        className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
                    />
                </div>


                {/* Disocunt Percent  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
                           Discount Percent 
                        </label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="0"
                            className="w-full rounded-lg border border-blue-100 bg-blue-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-300 focus:bg-white transition-colors duration-150"
                        />
                    </div>
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

export default CreateEvent