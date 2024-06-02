import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/actions/order';

const TrackOrder = () => {

    const {orders} = useSelector((state) => state.order);
    const {user} = useSelector((state) => state.user)

    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    },[dispatch])


    const data = orders && orders.find((item => {
        return item._id === id
    }))

    console.log("order track" , data);
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
        {
            data && data?.status === "Sedang dalam Perjalanan" ? ( 
            
                    <h1 className="text-[20px]">Pesananmu dalam sedang Perjalanan</h1>
                
            ) : (
                data?.status === "Diserahkan ke kurir" ? (
                    <h1 className="text-[20px]">Pesananmu sudah diserahkan ke kurir</h1>
                ) : (
                    data?.status === "Sedang Dikirim" ? (
                        <h1>Pesananmu sedang dalam perjalan dibawa oleh kurir</h1>
                    ) : (
                        data?.status === "Diterima" ? (
                            <h1>Pesanan sudah kamu terima</h1>
                        ) : (
                            data?.status === "Memproses Pembatalan" ? (
                                <h1>Pemesananmu sedang dalam proses Pembatalan</h1>
                            ) : (
                                data?.status === "Pembatalan Sukses" ? (
                                    <h1>Pembatalan pesananmu telah sukses</h1>
                                ) : (
                                    null
                                )
                            )
                        )
                    )
                )
            )
        }
    </div>
  )
}

export default TrackOrder