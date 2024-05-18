import React, { useState , Button} from 'react'
import { backend_url } from '../../server'
import { useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
 

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
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Nama Lengkap
                                </label>
                                <input type="text" className={`${styles.input} !w-[95%]`} 
                                        requiredvalue
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Email
                                </label>
                                <input type="text" className={`${styles.input} !w-[95%]`} 
                                        requiredvalue
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Nomor Telefon
                                </label>
                                <input type="number" className={`${styles.input} !w-[95%]`} 
                                        requiredvalue
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Kode Pos
                                </label>
                                <input type="number" className={`${styles.input} !w-[95%]`} 
                                        requiredvalue
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Alamat 1
                                </label>
                                <input type="adress" className={`${styles.input} !w-[95%]`} 
                                        requiredvalue
                                        value={adress1}
                                        onChange={(e) => setAdress1(e.target.value)}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label htmlFor="" className="block pb-2">
                                    Alamat 2
                                </label>
                                <input type="adress" className={`${styles.input} !w-[95%]`} 
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
          totalPrice: 120,
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
        <div>
            Hello
        </div>
      )
}
export default ProfileContent