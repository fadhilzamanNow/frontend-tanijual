import React, { useState} from 'react'
import { backend_url } from '../../server'
import { useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import {Button} from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid";
import { MdOutlineTrackChanges } from 'react-icons/md';

const ProfileContent = ({active}) => {
    const {user} = useSelector((state) => state.user);
    const [name,setName] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)
    const [phoneNumber,setPhoneNumber] = useState(null)
    const [zipCode,setZipCode] = useState(null)
    const [adress1,setAdress1] = useState("")
    const [adress2,setAdress2] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className="w-full">
        {active === 1 ? (
        <>
       
        <div className="flex justify-center w-full">
                <div className="relative">
                    <img src={`${backend_url}/${user.avatar}`} alt="" className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-green-100" />
                    <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[10px]">
                        <AiOutlineCamera color="black" size={24} />
                    </div>
                </div>

                
                
        </div>
        <div className="w-full px-5 mt-2">
                    <form action="" onSubmit={handleSubmit} aria-required={true}>
                        <div className="w-full 800px:flex block pb-3">
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Nama Lengkap
                                </label>
                                <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Email
                                </label>
                                <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full 800px:flex block pb-3">
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Nomor Telefon
                                </label>
                                <input type="number" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Kode Pos
                                </label>
                                <input type="number" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full 800px:flex block pb-3">
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Alamat 1
                                </label>
                                <input type="adress" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={adress1}
                                        onChange={(e) => setAdress1(e.target.value)}
                                />
                            </div>
                            <div className="800px:w-[50%] w-[100%]">
                                <label htmlFor="" className="block pb-2">
                                    Alamat 2
                                </label>
                                <input type="adress" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                                        requiredvalue
                                        value={adress2}
                                        onChange={(e) => setAdress2(e.target.value)}
                                />
                            </div>
                        </div>


                        <input type="sumbit" 
                            className="'w-[250px] h-[40px] border border-black text-center text-black rounded-[3px] mt-8 cursor-pointer"
                            required 
                            value="Ubah"
                        />
                        
                    </form>
                    
                </div>
        </>
            )
        : (null)}

        {
            active === 2 ? (
                <div>
                    <AllOrders />
                </div>
            )  : (null)
        }
        {
            active === 3 ? (
                <div>
                    <AllRefundOrders />
                </div>
            )  : (null)
        }
        {
            active === 5 ? (
                <div>
                    <TrackOrder />
                </div>
            )  : (null)
        }
        {
            active === 6 ? (
                <div>
                    <PaymentMethod />
                </div>
            )  : (null)
        }
         {
            active === 7 ? (
                <div>
                    <Adress />
                </div>
            )  : (null)
        }
    </div>
  )
}



const AllOrders = () => {
    const orders = [
        {
          _id: "7463hvbfbhfbrtr28820221",
          orderItems: [
            {
              name: "Iphone 14 pro max",
            },
          ],
          totalPrice: 12000,
          orderStatus: "Processing",
        },
      ];
    
      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
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

      orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty : item.orderItems.length,
            total : "Rp. " + item.totalPrice,
            status : item.orderStatus
        })
      });


      return(
        <div className="pl-8 pt-1">
            <DataGrid 
            rows={row}
            columns = {columns}
            pageSize = {10}
            disableSelectionOnClick
            autoHeight 
            />
        </div>
      )
}

const AllRefundOrders = () => {

    const orders = [
        {
          _id: "7463hvbfbhfbrtr28820221",
          orderItems: [
            {
              name: "Iphone 14 pro max",
            },
          ],
          totalPrice: 12000,
          orderStatus: "Processing",
        },
      ];
    
      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
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

      orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty : item.orderItems.length,
            total : "Rp. " + item.totalPrice,
            status : item.orderStatus
        })
      });


      return(
        <div className="pl-8 pt-1">
            <DataGrid 
            rows={row}
            columns = {columns}
            pageSize = {10}
            disableSelectionOnClick
            autoHeight 
            />
        </div>
      )
}

const TrackOrder = () => {
    const orders = [
        {
          _id: "7463hvbfbhfbrtr28820221",
          orderItems: [
            {
              name: "Iphone 14 pro max",
            },
          ],
          totalPrice: 12000,
          orderStatus: "Processing",
        },
      ];

      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <MdOutlineTrackChanges size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];

      orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty : item.orderItems.length,
            total : "Rp. " + item.totalPrice,
            status : item.orderStatus
        })
      });


    return (
        <div>
            <div className="pl-8 pt-1">
                <DataGrid 
                    rows={row}
                    columns={columns}
                    pageSize= {10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div>
    )
}


const PaymentMethod = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-black pb-2">
                    Metode Pembayaran
                </h1>
                <div className={`bg-black rounded-md h-[50px] w-[150px] text-center text-white p-4`}>
                    Tambah 
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                <img
                src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
                alt=""
                />
                <h5 className="pl-5 font-[600]">Fadhil Isfadhillah</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>1234 **** ****</h6>
                    <h5 className="pl-6">08/2024</h5>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete 
                        size={25}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}


const Adress = () => {

    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-black pb-2">
                    Alamat
                </h1>
                <div className={`bg-black rounded-md h-[50px] w-[150px] text-center text-white p-4`}>
                    Tambah Alamat
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                
                <h5 className="pl-5 font-[600]">Alamat Utama</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>Desa Blater No.25</h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>089503908873</h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete 
                        size={25}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileContent