import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineArrowRight } from "react-icons/ai";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(user?.zipCode || "");
  const [address1, setAddress1] = useState(user?.address1 || "");
  const [address2, setAddress2] = useState(user?.address2 || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, phone, zipCode, address1, address2 });
  };
  return (
    <>
      {/* PROFILE */}
      {active === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-8">Profile Information</h2>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={user?.avatar?.url || "https://via.placeholder.com/120"}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-200"
              />
              <button className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full">
                <AiOutlineCamera size={18} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-medium text-gray-700">Address Line 1</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-medium text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* ORDERS */}
      {active === 2 && (
        <AllOrders />
      )}

      {/* REFUND ORDERS */}
      {active === 3 && (
        <RefundOrders/>
      )}

    </>
  );
};

const AllOrders = () => {
  const Orders = [
    {
      id: "ORD-1001",
      status: "Processing",
      total: 120,
      qty: 1,
    },
    {
      id: "ORD-1002",
      status: "Delivered",
      total: 250,
      qty: 2,
    },
    {
      id: "ORD-1003",
      status: "Shipped",
      total: 80,
      qty: 1,
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 160,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-mono text-xs font-semibold text-pink-600">
          #{params.value?.slice(-8).toUpperCase()}
        </span>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.6,
      renderCell: (params) => {
        const isDelivered = params.row.status === "Delivered";

        return (
          <div className="flex items-center h-full">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${isDelivered
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : "bg-pink-100 text-pink-700 border-pink-200"
                }`}
            >
              {params.row.status}
            </span>
          </div>
        );
      },
    },

    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 80,
      flex: 0.4,
      renderCell: (params) => (
        <span className="font-bold text-black">{params.value}</span>
      ),
    },

    {
      field: "total",
      headerName: "Total",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span className="font-bold text-blue-700">
          {params.value}
        </span>
      ),
    },

    {
      field: "action",
      headerName: "View",
      minWidth: 90,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Link
          to={`/user/order/${params.id}`}
          className="flex items-center h-full"
        >
          <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-sm">
            <AiOutlineArrowRight size={18} />
          </div>
        </Link>
      ),
    },
  ];
  const rows = []
  //pushing orders data into rows 
  Orders && Orders.forEach((order) => {
    rows.push({
      id: order.id,
      status: order.status,
      total: `$ ${order.total}`,
      itemsQty: order.qty
    })
  })

  return (
    <div className="w-full bg-white rounded-2xl border border-pink-100 shadow-lg p-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">
            My Orders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and track all your orders.
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          {rows.length} Orders
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-pink-100">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FDF2F8",
              color: "#111827",
              fontWeight: "bold",
              fontSize: "15px",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EFF6FF",
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#F3F4F6",
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FFF",
            },
          }}
        />
      </div>
    </div>
  );
}


const RefundOrders=()=>{
 const Orders = [
    {
      id: "ORD-1001",
      status: "Processing",
      total: 120,
      qty: 1,
    },
    {
      id: "ORD-1002",
      status: "Delivered",
      total: 250,
      qty: 2,
    },
    {
      id: "ORD-1003",
      status: "Shipped",
      total: 80,
      qty: 1,
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 160,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-mono text-xs font-semibold text-pink-600">
          #{params.value?.slice(-8).toUpperCase()}
        </span>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 140,
      flex: 0.6,
      renderCell: (params) => {
        const isDelivered = params.row.status === "Delivered";

        return (
          <div className="flex items-center h-full">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${isDelivered
                ? "bg-blue-100 text-blue-700 border-blue-200"
                : "bg-pink-100 text-pink-700 border-pink-200"
                }`}
            >
              {params.row.status}
            </span>
          </div>
        );
      },
    },

    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 80,
      flex: 0.4,
      renderCell: (params) => (
        <span className="font-bold text-black">{params.value}</span>
      ),
    },

    {
      field: "total",
      headerName: "Total",
      minWidth: 120,
      flex: 0.6,
      renderCell: (params) => (
        <span className="font-bold text-blue-700">
          {params.value}
        </span>
      ),
    },

    {
      field: "action",
      headerName: "View",
      minWidth: 90,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Link
          to={`/user/order/${params.id}`}
          className="flex items-center h-full"
        >
          <div className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-sm">
            <AiOutlineArrowRight size={18} />
          </div>
        </Link>
      ),
    },
  ];
  const rows = []
  //pushing orders data into rows 
  Orders && Orders.forEach((order) => {
    rows.push({
      id: order.id,
      status: order.status,
      total: `$ ${order.total}`,
      itemsQty: order.qty
    })
  })

  return (
    <div className="w-full bg-white rounded-2xl border border-pink-100 shadow-lg p-6">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">
          Refund Orders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and track all your refundings .
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          {rows.length} Refunds
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-pink-100">
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FDF2F8",
              color: "#111827",
              fontWeight: "bold",
              fontSize: "15px",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#EFF6FF",
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#F3F4F6",
              display: "flex",
              alignItems: "center",
            },

            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FFF",
            },
          }}
        />
      </div>
    </div>
  );
}
export default ProfileContent;