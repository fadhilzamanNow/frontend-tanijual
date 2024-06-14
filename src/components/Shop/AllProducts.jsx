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
        <div className ="flex flex-col w-full">

            <div className='flex flex-col w-full lg:flex-row pb-[100px] lg:justify-center'>
                <div className="flex justify-center h-full">
                    <div className="mt-10">
                        <div className="font-[600]">
                            Statistik Stok Antar Produk
                        </div>
                        <PieChart
                            series={[
                                {
                                data: data2,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
                                },
                            ]}
                            width={400}
                            height={200}
                            margin={{right : 200}}
                            slotProps={{ legend: {
                                direction: 'column',
                                position: { vertical: 'middle', horizontal: 'right' },
                                padding : 0,
                                labelStyle : {
                                    fontWeight : 600,
                                    
                                },
                                

                            }}}
                            />
                    </div>

                </div>

                <div className="flex justify-center h-full">
                    <div className="mt-10">
                        <div className="font-[600]">
                            Statistik Produk Terlaku 
                        </div>
                        <PieChart
                            series={[
                                {
                                data: data3,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
                                },
                            ]}
                            width={400}
                            height={200}
                            margin={{right : 200}}
                            slotProps={{ legend: {
                                direction: 'column',
                                position: { vertical: 'middle', horizontal: 'right' },
                                padding : 0,
                                labelStyle : {
                                    fontWeight : 600,
                                    
                                },
                                

                            }}}
                            />
                    </div>

                </div>
            </div>
            <div>
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
            
            </div>
        )
    }
    </>
  )
}

export default AllProducts