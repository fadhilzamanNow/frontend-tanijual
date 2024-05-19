import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';
import { deleteEvent, getAllEventsShop } from '../../redux/actions/event';

const AllEvents = () => {
    const {events, isLoading} = useSelector((state) => state.events);
    const {seller} = useSelector((state) => state.seller)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsShop(seller._id))
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
        window.location.reload()
    }

    const columns = [
        {field : "id", headerName : "Product Id", minWidth : 150, flex : 0.7},
        {
            field : "name",
            headerName : "Name",
            minWidth : 180,
            flex : 1.4
        },
        {
            field : "price",
            headerName : "Price",
            minWidth : 100,
            flex : 0.6
        },
        {
            field : "stock",
            headerName : "Stock",
            minWidth : 80,
            flex : 0.5
        },
        {
            field : "sold",
            headerName : "Sold Out",
            minWidth : 130,
            flex : 0.6
        },
        {
            field : "Preview",
            flex : 0.8,
            minWidth : 100,
            headerName : "",
            type : "number",
            sortable : false,
            renderCell : (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g,"-");
                return (
                    <>
                    <Link to={`/product/${product_name}`} >
                        <Button>
                            <AiOutlineEye size={20}/>
                        </Button>
                    </Link>
                    </>
                )
            }

        },
        {
            field : "Delete",
            flex : 0.8,
            minWidth : 120,
            headerName : "",
            type : "number",
            sortable : false,
            renderCell : (params) => {
                
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20}/>
                        </Button>  
                    </>
                )
            }

        }
    ];


    const row = [];

    events && events.forEach((item) => {
        row.push({
            id : item._id,
            name : item.name,
            price: "Rp. " + item.discountPrice,
            stock : item.stock,
            sold : 10
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

export default AllEvents