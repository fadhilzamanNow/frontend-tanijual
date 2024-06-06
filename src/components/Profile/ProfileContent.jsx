import React, { useEffect, useState} from 'react'
import { backend_url, server } from '../../server'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import {Button} from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid";
import { MdOutlineTrackChanges } from 'react-icons/md';
import { deleteUserAdddress, loadUser, updateUserAddress, updateUserInformation } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import {Country, State} from "country-state-city"
import { getAllOrdersOfUser } from '../../redux/actions/order';

const ProfileContent = ({active}) => {
    const {user} = useSelector((state) => state.user);
    const [name,setName] = useState(user && user.name)
    const [email,setEmail] = useState(user && user.email)
    const [phoneNumber,setPhoneNumber] = useState(null)
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState(null);

    const dispatch = useDispatch();

   
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
          dispatch(updateUserInformation(user.email,password,phoneNumber,name));
          
          
        }
        catch(error){
          console.log("Terdapat sebuah kesalahan, coba lagi: ", error)
        }
    }

    const handleImage = async (e) => {
      const file = e.target.files[0];
      setAvatar(file);

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if(reader.readyState === 2){
          setAvatar(reader.result);
          axios.put(`${server}/user/update-avatar`, {avatar : reader.result}, {withCredentials : true}).then((res) => {
            dispatch(loadUser());
            toast.success("Foto Profil Telah Berhasil Diganti")
          }).catch((err) => {
            toast.error("Profil tidak berhasil diganti");
          })
        }
      }

      //const formData = new FormData();

      //formData.append("image", e.target.files[0])
      /* await axios.put(`${server}/user/update-avatar`, formData, {
        headers : {
          "Content-Type" : "multipart/form-data",
        },
        withCredentials : true,
      }).then((response) => {
        toast.success("Foto Profilmu berhasil untuk di-update");
        setTimeout(() => {
          window.location.reload()
        },1000)
      }).catch((error) => {
        toast.error(error)
      }) */
    }

  return (
    <div className="w-full">
        {active === 1 ? (
        <>
       
        <div className="flex justify-center w-full">
                <div className="relative">
                    <img src={`${user?.avatar?.url}`} alt="" className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-green-100" />
                    <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[10px]">
                        <input type="file" id="image" className='hidden' onChange={handleImage} />
                        <label htmlFor="image">
                        <AiOutlineCamera color="black" size={24} />
                        </label>
                    </div>
                </div>

                
                
        </div>
        <div className="w-full px-5 mt-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0 bg-gray-200`}
                    required
                    value={user?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly = {true}

                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Nomor Telefon</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Konfirmasi Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-green-400 text-center text-green-500 rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Ubah Nama/Nomor"
                type="submit"
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
                    <ChangePassword />
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
  
    const {orders, isLoading} = useSelector((state) => state.order)
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id))
    },[])
    console.log("loading :", isLoading)
    console.log("order : ", orders);
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
                <Link to={`/user/order/${params.id}`}>
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

      orders && orders?.forEach((item) => {
        row.push({
            id: item._id,
            itemQty : item.cart.length,
            total : "Rp. " + item.totalPrice,
            status : item.status
           
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

  const {orders, isLoading} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  },[])


  const orderbenar = orders && orders.filter((item) => {
    return item.status === "Memproses Pembatalan"
  })
  console.log("loading :", isLoading)
  console.log("order : ", orders);
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
              <Link to={`/user/order/${params.id}`}>
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

    orderbenar && orderbenar?.forEach((item) => {
      row.push({
          id: item._id,
          itemQty : item.cart.length,
          total : "Rp. " + item.totalPrice,
          status : item.status
         
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
  const {orders, isLoading} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  },[])
  console.log("loading :", isLoading)
  console.log("order : ", orders);
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
              <Link to={`/user/track/order/${params.id}`}>
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

    orders && orders?.forEach((item) => {
      row.push({
          id: item._id,
          itemQty : item.cart.length,
          total : "Rp. " + item.totalPrice,
          status : item.status
         
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


const ChangePassword = () => {

  const [oldPassword,setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const passwordChangeHandler = async(e) => {
    e.preventDefault()
    try{
      await axios.put(`${server}/user/update-password`,{
        oldPassword, newPassword, confirmPassword
      }, {withCredentials : true} ).then((res) => {
        console.log(res.data);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success(`${res.data.message}`);
      })
    }catch(error){
      console.log("error axios", error.response.data.message)
      toast.error(`${error?.response?.data?.message}`);
    }
    
  }
    return (
        <div className="w-full px-5">
           
                <h1 className="text-[25px] font-[600] text-black pb-2 text-center">
                    Ganti Password
                </h1>
                <div className="w-full">
                  <form action="" aria-required={true} onSubmit={passwordChangeHandler} className='flex flex-col items-center'>
                    
                 <div className='w-[100%] 800px:w-[70%] mt-5'> 
                    <label className="block pb-2">
                                  Masukkan password lamamu
                                </label>            
                                <input type="password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} className={`w-[100%] h-[40px] border rounded-[5px]`}/>
                            </div>
                            <div className='w-[100%] 800px:w-[70%] mt-5'> 
                    <label className="block pb-2">
                                  Masukkan password baru
                                </label>            
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className={`w-[100%] h-[40px] border rounded-[5px]`}/>
                            </div>
                            <div className='w-[100%] 800px:w-[70%] mt-5'> 
                    <label className="block pb-2">
                                  Konfirmasikan password barumu
                                </label>            
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className={`w-[100%] h-[40px] border rounded-[5px]`}/>
                            </div>
                            <div className='w-[100%] 800px:w-[70%] mt-5'> 
                          
                            <input type="submit" reuired value="Ganti password" className={`w-[100%] h-[40px] border-red-500 border rounded-[5px] text-red-500`}/>
                            </div>
                            
                  </form>
                </div>
            <br />
           
        </div>
    )
}


const Adress = () => {

  const [open,setOpen] = useState(false);
  const [country,setCountry] = useState("");
  const [city,setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAdress1] = useState("");
  const [address2, setAdress2] = useState("");
  const [addressType,setAdressType] = useState("");
  const {user,error,updateAddressSuccessMessage,deleteAddressSuccessMessage} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name : "Utama"
    },
    {
      name : "Rumah"
    },
    {
      name : "Kantor"
    }
  ];

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch({ type : "clearErrors"})
    }
    if(updateAddressSuccessMessage){
      toast.success(updateAddressSuccessMessage)
    }
    if(deleteAddressSuccessMessage){
      toast.success(deleteAddressSuccessMessage)
    }
  },[error, updateAddressSuccessMessage,deleteAddressSuccessMessage])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(addressType === "" || country === "" || city === ""){
      toast.error("Mohon diisi data alamatnya secara lengkap")
    }else{
      dispatch(updateUserAddress(country,city,address1,address2,addressType,zipCode))
    }
    setOpen(false);
    setCountry("");
    setCity("");
    setAdress1("");
    setAdress2("");
    setZipCode();
    setAdressType("");
  }


  const handleDelete = async (id) => {
    dispatch(deleteUserAdddress(id))
  }
    return (
        <div className="w-full px-5">
          {
            open && (
              <div className="fixed w-full h-screen bg-[#ffffff2f] top-0 left-0 flex items-center justify-center">
                  <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
                    <div className='w-full flex justify-end p-3'>
                    <RxCross1 
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                    </div>
                    <h1 className='w-full text-center text-[32px]'>
                      Tambah alamat baru
                    </h1>
                    <div className='w-full'>
                      <form action="" onSubmit={handleSubmit}>
                            <div className='w-full block p-4'> 
                                <label htmlFor="block pb-2">
                                  Negaramu
                                </label>
                                <select name="" id="" value={country} onChange={(e) =>setCountry(e.target.value)} className='w-[95%] h-[40px] border rounded-[5px]'>
                                  <option value="">Pilih negaramu</option>
                                  {
                                    Country && Country.getAllCountries().map((item) => {
                                      return (
                                        <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                            </div>
                            <div className='w-full block p-4'> 
                                <label htmlFor="block pb-2">
                                  Kotamu
                                </label>
                                <select name="" id="" value={city} onChange={(e) =>setCity(e.target.value)} className='w-[95%] h-[40px] border rounded-[5px]'>
                                  <option value="">Pilih kotamu</option>
                                  {
                                    State && State.getStatesOfCountry(country).map((item) => {
                                      return (
                                        <option className='block pb-2' key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                            </div>
                            <div className='w-full block p-4'> 
                                <label htmlFor="block pb-2">
                                  Alamat 1
                                </label>
                                <input type="address" className={`w-[95%] h-[40px] border rounded-[5px]`}  required value={address1} onChange={(e) => setAdress1(e.target.value)}/>
                                <div>
                                <label htmlFor="block pb-2">
                                  Alamat 2
                                </label>
                                <input type="address" className={`w-[95%] h-[40px] border rounded-[5px]`}  required value={address2} onChange={(e) => setAdress2(e.target.value)}/>
                                </div>
                                <div>
                                <label htmlFor="block pb-2">
                                  Kode Pos
                                </label>
                                <input type="number" className={`w-[95%] h-[40px] border rounded-[5px]`}  required value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                                </div>
                               
                            </div>
                            <div className='w-full block p-4'> 
                                <label htmlFor="block pb-2">
                                  Jenis Alamat
                                </label>
                                <select name="" id="" value={addressType} onChange={(e) =>setAdressType(e.target.value)} className='w-[95%] h-[40px] border rounded-[5px]'>
                                  <option value="">Pilih Jenis Alamat</option>
                                  {
                                    addressTypeData && addressTypeData.map((item) => {
                                      return (
                                        <option className='block pb-2' key={item.name} value={item.name}>
                                            {item.name}
                                        </option>
                                      )
                                    })
                                  }
                                </select>
                            </div>
                            <div className='"w-full pb-2'>
                                <input type="submit" className={`w-[95%] h-[40px] border rounded-[5px]`} required readOnly/>
                            </div>
                      </form>
                    </div>
                    
                  </div>
              </div>
            )
          }
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-black pb-2">
                    Alamat
                </h1>
                <div className={`bg-black rounded-md h-[50px] w-[150px] text-center text-white p-4`} onClick={() => setOpen(true)}> 
                    Tambah Alamat
                </div>
            </div>
            <br />
            {
              user && user.addresses.map((item,index) => {
                return (
                  <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow-md justify-between pr-10 mb-10" key={index} >
                  <div className="flex items-center">
                  
                  <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                  </div>
                  <div className="pl-8 flex-col items-center">
                      <h6>Alamat 1 : {item.address1} </h6>
                      <h6>Alamat 2 : {item.address2} </h6>
                  </div>
                  <div className="pl-8 flex items-center">
                      <h6>{user?.phoneNumber}</h6>
                  </div>
                  <div className="min-w-[10%] flex items-center justify-between pl-8" >
                      <AiOutlineDelete 
                          size={25}
                          className="cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                      />
                  </div>
            </div>
                )
              })
            }
            {
              user?.addresses?.length === 0 ? (
              <div className='flex items-center justify-center '>
                Kamu belum memiliki alamat yang disimpan
              </div>) : (null)
            }
        </div>
    )
}

export default ProfileContent