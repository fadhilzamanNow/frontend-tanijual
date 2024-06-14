import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Button } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';

const AllProducts = () => {
    const {products, isLoading} = useSelector((state) => state.products);
    const {seller} = useSelector((state) => state.seller)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        window.location.reload()
    }

    const columns = [
        {field : "id", headerName : "ID Produk", minWidth : 150, flex : 0.7},
        {
            field : "name",
            headerName : "Nama",
            minWidth : 180,
            flex : 1.4
        },
        {
            field : "price",
            headerName : "Harga",
            minWidth : 100,
            flex : 0.6
        },
        {
            field : "stock",
            headerName : "Stok",
            minWidth : 80,
            flex : 0.5
        },
        {
            field : "sold",
            headerName : "Terjual",
            minWidth : 130,
            flex : 0.6
        },
        {
            field : "Preview",
            flex : 0.4,
            minWidth : 50,
            headerName : "Lihat Barang",
            type : "number",
            sortable : false,
            renderCell : (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g,"-");
                return (
                    <>
                    <Link to={`/product/${params.row.id}`} >
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

    products && products.forEach((item) => {
        row.push({
            id : item._id,
            name : item.name,
            price: "Rp. " + item.discountPrice,
            stock : item?.stock,
            sold : item?.sold_out
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

export default AllProducts