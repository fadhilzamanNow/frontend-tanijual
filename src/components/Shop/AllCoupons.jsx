import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { Button } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { categoriesData } from '../../static/data';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const AllCoupons = () => {
    const {products} = useSelector((state) => state.products);
    const {seller} = useSelector((state) => state.seller)
    const [open,setOpen] = useState(false);
    const [name,setName] = useState("");
    const [value,setValue] = useState("");
    const [minAmount,setMinAmount] = useState();
    const [maxAmount,setMaxAmount] = useState();
    const [selectedProduct,setSelectedProduct] = useState("");
    const [coupons,setCoupons] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(getAllProductsShop(seller._id))
        setIsLoading(true)
        axios.get(`${server}/coupon/get-coupon/${seller._id}`,{withCredentials : true}).then((res) => {
            setIsLoading(false);
            setCoupons(res.data.couponCodes)
        }).catch((err) => {
            setIsLoading(false);
            console.log("ada salah kocak :", err)
        })
    },[dispatch])

    const handleDelete = (id) => {
        console.log("id yang ingin didelete : " , id)
        axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials : true}).then((res) => {
            toast.success("Selamat anda berhasil menghapus kupon");
            window.location.reload()

        }).catch((err) => {
            toast.error("Maaf tidak dapat menghapus karena : ",err);
        })
    }

    const columns = [
        {field : "id", headerName : "ID Kode Promo", minWidth : 150, flex : 0.7},
        {
            field : "name",
            headerName : "Nama Kode Promo",
            minWidth : 180,
            flex : 1.4
        },
        {
            field : "price",
            headerName : "Persentase Diskon",
            minWidth : 200,
            flex : 0.6
        },
        {
            field : "Hapus",
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

    coupons && coupons.forEach((item) => {
        row.push({
            id : item._id,
            name : item.name,
            price: item.value + " %",
            
           
        })
    })

    const handleSubmit =  async (e) => {
        e.preventDefault();
        await axios.post(`${server}/coupon/create-coupon-code`,{
            name,
            minAmount,
            maxAmount,
            selectedProduct,
            value,
            shopId : seller._id
        },{withCredentials : true}).then((res) => {
            console.log(res.data)
            toast.success("Mantap telah dibuaat kuponnya")
            window.location.reload()
        }).catch((e) => {
            toast.error(e)
        })
    }

    console.log(products);

  return (
    <>
    {
        isLoading ? (<Loader />) : (
            <div className="w-full  bg-white lg:mx-1">
                <div className="w-full flex justify-end mb-5">
                    <div className={`${styles.button} !w-[150px] mr-3`} onClick={() => setOpen(true)}>
                        <span className="text-white">Buat Kode Promo</span>
                    </div>
                </div>
                <DataGrid 
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                />
                {
                    open && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#10111136] z-[2000] flex items-center justify-center">
                            <div className='800px:w-[75%] w-[90%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
                                <div className="w-full flex justify-end">
                                    <RxCross1 size={30} className="mr-3 mt-3 cursor-pointer" onClick={() => setOpen(false)}/>
                                </div>
                                <h5 className="text-[20px] font-Poppins text-center">
                                    Membuat Kode Promo
                                </h5>
                                <form onSubmit={handleSubmit} aria-required={true}>
                                    <div>
                                        <label htmlFor="name" className='pb-2'>
                                            Nama <span className='text-red-400'>*</span>
                                        </label>
                                        <input type="text" name='name'  required value={name} onChange={(e)=> setName(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan nama kupon'/>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="name" className='pb-2'>
                                            Nilai Diskon (%) <span className='text-red-400'>*</span>
                                        </label>
                                        <input type="text" name='name' required value={value} onChange={(e)=> setValue(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan persentase diskon kupon'/>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="name" className='pb-2'>
                                            Minimal Pembayaran 
                                        </label>
                                        <input type="number" name='name'  value={minAmount} onChange={(e)=> setMinAmount(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Minimal Pembayaran'/>
                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="name" className='pb-2'>
                                            Maksimal Pembayaran 
                                        </label>
                                        <input type="number" name='name'  value={maxAmount} onChange={(e)=> setMaxAmount(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Maksimal Pembayaran'/>
                                    </div>
                                    <br />
                                   
                                    <div>
                                        <label htmlFor="name" className='pb-2'>
                                            Pilih Produk <span className='text-red-400'>*</span>
                                        </label>
                                        <select name="category" id="" className=" mt-2 border h-[35px] rounded-[5px] w-full" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                                            <option value="Pilih Kategori Produk">Pilih Kategori Produk </option>
                                                {
                                                    products && products.map((i) => {
                                                        return (<option value={i.name} key={i.name}>
                                                            {i.name}
                                                        </option> )
                                                    })
                                                }
                                        
                                        </select>
                                    </div>
                                    <div>
                                        <input type="submit" name='name' value="Buat Kode Promo" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm bg-green-500 text-white' />
                                    </div>
                                </form>
                            </div> 
                        </div>
                    )
                }
            </div>
           
        )
    }
    </>
  )
}

export default AllCoupons