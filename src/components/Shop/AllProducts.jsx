import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Button } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@mui/x-data-grid';
import NyobaGrid from './NyobaGrid';
import { PieChart } from '@mui/x-charts/PieChart';
import {DataGrid as DataGrid2} from "@material-ui/data-grid"


const AllProducts = () => {
    const {products, isLoading} = useSelector((state) => state.products);
    const {seller} = useSelector((state) => state.seller)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
    },[dispatch])

    const handleDelete = async (id) => {
        dispatch(deleteProduct(id))
        
        setTimeout(() => {
            window.location.reload()
        },3000)
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
            minWidth : 120,
            flex : 0.6
        },
        {
            field : "stock",
            headerName : "Stok",
            minWidth : 120,
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
            minWidth : 120,
            headerName : "Lihat",
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
    const data2 = [
      
    ]
    const data3 = []

    products && products.forEach((item) => {
        row.push({
            id : item._id,
            name : item.name,
            price: "Rp. " + item.discountPrice,
            stock : item?.stock,
            sold : item?.sold_out
        })
        data2.push({
            value : item?.stock,
            label : item?.name
        })
        data3.push({
            value : item?.sold_out,
            label : item?.name
        })
    })

  


    

  return (
    <>
    {
        isLoading ? (<Loader />) : (
        <div className ="w-full">

            
            <div className="hidden lg:block">
                <DataGrid 
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                    slots={{
                        toolbar : NyobaGrid
                    }}
                    
                />
            </div>
            <div className="lg:hidden">
            <div className="text-center mb-[20px] font-Poppins text-[20px] font-[600] ">
              Semua Produk
            </div>
                <DataGrid2
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                        
                        
                    />
            </div>
            
            </div>
        )
    }
    </>
  )
}

export default AllProducts