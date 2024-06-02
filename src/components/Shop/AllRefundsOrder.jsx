import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Button } from '@material-ui/core';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';
import { getAllOrdersOfShop } from '../../redux/actions/order';

const AllRefundOrders = () => {
    const {orders, isLoading} = useSelector((state) => state.order);
    const {seller} = useSelector((state) => state.seller)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id))
    },[])

    console.log(orders, isLoading)

    const refundOrders = orders && orders.filter((item) => {
        return item?.status === "Memproses Pembatalan"
    })

    

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.1,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemQty",
          headerName: "Jumlah",
          type: "number",
          minWidth: 130,
          flex: 0.1,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.1,
        },
    
        {
          field: " ",
          flex: 0.1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];



    const row = [];

    refundOrders && refundOrders.forEach((item) => {
        row.push({
            id: item._id,
            itemQty : item.cart.length,
            total : "Rp. " + item.totalPrice,
            status : item.status
        })
    })

    

  return (
    <>
    {
        isLoading ? (<Loader />) : (
            <DataGrid 
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        )
    }
    </>
  )
}

export default AllRefundOrders