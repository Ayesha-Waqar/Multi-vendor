import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { getEvents , deleteEvent } from "../../../redux/actions/event";

const ShowEvents = () => {
  const { isLoading, events } = useSelector(
    (state) => state.events
  );

  const { seller } = useSelector(
    (state) => state.seller
  );

  const dispatch = useDispatch();

  // Fetch seller events
  useEffect(() => {
    if (seller?._id) {
      dispatch(getEvents(seller._id));
    }
    console.log("reloading")
  }, [dispatch, seller?._id]);

  useEffect(() => {
  console.log("Events:", events);
}, [events]);

const handleDelete =(id)=>{
  // console.log("id",id)
  dispatch(deleteEvent(id))
 window.location.reload()

}

  // Table columns
  const columns = [
    {
      field: "id",
      headerName: "Event ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 120,
    },
    {
      field: "sold",
      headerName: "Sold Out",
      type: "number",
      width: 120,
    },
   {
  field: "preview",
  headerName: "",
  sortable: false,
  renderCell: (params) => {
    const slug = params.row.name?.trim().replace(/\s+/g, "-");

    return (
      <Link to={`/product/${slug}`}>
        <Button>
          <AiOutlineEye />
        </Button>
      </Link>
    );
  },
},
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Button onClick={()=>{handleDelete(params.id)}} >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  // Convert products into DataGrid rows
  const rows =
    events?.map((event) => ({
      id: event._id,
      name: event.name,
      price: event.discountPrice,
      stock: event.stock,
      sold:event.sold_out,
    })) || [];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
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
  );
};

export default ShowEvents;

