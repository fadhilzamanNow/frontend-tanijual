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
        {field : "id", headerName : "ID Promo", minWidth : 150, flex : 0.7},
        {
            field : "name",
            headerName : "Nama ",
            minWidth : 180,
            flex : 1.4,
            
        },
        {
            field : "price",
            headerName : "Harga Diskon",
            minWidth : 50,
            flex : 0.6,
           
            
            
        },
        {
            field : "original",
            headerName : "Harga Asli",
            minWidth : 50,
            flex : 0.6
        },
        
        {
            field : "Delete",
            flex : 0.8,
            minWidth : 120,
            headerName : "Hapus",
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
            id : item?._id,
            name : item?.name,
            price: "Rp. " + item?.discountPrice,
            original : "Rp. " + item?.originalPrice,
            stock : item?.stock,
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