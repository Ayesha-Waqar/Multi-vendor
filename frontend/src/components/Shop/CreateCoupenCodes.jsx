import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye, AiOutlineClose } from "react-icons/ai";
import { createCoupens , deleteCoupen, getCoupons } from "../../redux/actions/coupens"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const CreateEvent = () => {
    const { seller } = useSelector((state) => state.seller)
    const { isLoading, success, error, coupens } = useSelector((state) => state.coupencodes)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }

        if (success) {
            toast.success("Coupen Code Generated");

            setTimeout(() => {
                dispatch({ type: "CoupenCreateReset" });
                window.location.reload()
            }, 1500);
        }
    }, [dispatch, error, success, navigate]);

      // Fetch seller coupens
      useEffect(() => {
        if (seller?._id) {
          dispatch(getCoupons(seller._id));
        //   window.location.reload()
        }
        console.log("reloading")
      }, [dispatch, seller?._id]);
    
    //   useEffect(() => {
    //   console.log("Coupenss:", coupens);
    // }, [coupens]);


    const handleDelete =(id)=>{
      // console.log("id",id)
      dispatch(deleteCoupen(id))
     window.location.reload()
    
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const coupenCodeData = {
                name,
                shopId: seller._id,
                value
            }

            dispatch(createCoupens(coupenCodeData))
            setOpen(false)

        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        { field: "id", headerName: "Coupen Code ID", width: 220 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "value", headerName: "Value", type: "number", width: 120 },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 100,
            renderCell: (params) => (
                <Button onClick={() => { handleDelete(params.id) }}>
                    <AiOutlineDelete size={20} />
                </Button>
            ),
        },
    ];

    const rows =
        coupens?.map((coupen) => ({
            id: coupen._id,
            name: coupen.name,
            value: coupen.value
        })) || [];

    return (
        <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
            {/* Header row: title + create button aligned together */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-800">Coupon Codes</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-2.5 bg-pink-500 text-white font-medium rounded-lg shadow-sm hover:bg-pink-600 active:scale-95 transition-all duration-200"
                >
                    Create Coupon
                </button>
            </div>

            {/* Data grid card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0,
                            },
                        },
                    }}
                />
            </div>

            {/* Modal overlay for creating a coupon */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-pink-100 p-6 sm:p-8 relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <AiOutlineClose size={18} />
                        </button>

                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6">
                            Create Coupon Code
                        </h3>

                        <form onSubmit={submitHandler} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
                                    Coupon Code Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your coupon name..."
                                    required
                                    className="w-full rounded-lg border border-pink-100 bg-pink-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-400 focus:bg-white transition-colors duration-150"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wide font-medium text-pink-500 mb-1.5">
                                    Discount Percent
                                </label>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="0"
                                    className="w-full rounded-lg border border-pink-100 bg-pink-50/30 px-3.5 py-2.5 text-sm text-black placeholder:text-black/30 outline-none focus:border-pink-400 focus:bg-white transition-colors duration-150"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-2 w-full rounded-lg bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 transition-colors duration-150"
                            >
                                {isLoading ? "Creating..." : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateEvent;