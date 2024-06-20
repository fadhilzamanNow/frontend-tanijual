import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { PieChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts";
import { Box } from "@mui/material";


const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOrder] = useState(orders && orders);

  useEffect(() => {
     dispatch(getAllOrdersOfShop(seller._id));
     dispatch(getAllProductsShop(seller._id));

     const orderData = orders && orders.filter((item) => item.status === "Diterima");
     console.log("jumlah order", orderData)
     setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax = deliveredOrder ? deliveredOrder.reduce((acc,item) => acc + item.totalPrice, 0) : 0;

  const serviceCharge = 0
  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed() || 0;
  
 /*  const columns = [
    { field: "id", headerName: "ID Pesanan", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Diterima"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Jumlah",
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
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "Rp.  " + item.totalPrice,
        status: item.status,
      });
  }); */

  const data2 = []
  const data3 = []
  const data4 = []

  products && products.forEach((item) => {
      data2.push({
          value : item?.stock,
          label : item?.name
      })
      data3.push({
          value : item?.sold_out,
          label : item?.name
      })
  })
  useEffect(() => {
    console.log(window.innerHeight);
    console.log(window.innerWidth)
  },[window.innerHeight,window.innerWidth])
  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Analisis Penjualan</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <FaMoneyBillWave
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Uang Masuk
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">Rp. {availableBalance}</h5>
          
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Jumlah Pesanan 
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders && orders.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Lihat Semua Pesanan</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <FiPackage
              size={30}
              className="mr-2"
              fill="white"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Jumlah Produk
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products && products.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Lihat Semua Produk</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Statistik</h3>
      <div className="md:hidden"> 
        <div className="w-full min-h-[20vh] bg-white rounded flex  justify-center items-center  ">
          <Box
            sx={{textAlign : "center"}}
          >
            <h1 className="font-[600]">
              Statistik Stok Antar Produk
            </h1>
          <PieChart
                              series={[
                                {
                                  data: data2,
                                  highlightScope: { faded: 'global', highlighted: 'item' },
                                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                  cx : "85%",
                                  cy : "80%"
                                  
                                  },
                              ]}
                              width={250}
                              height={200}
                              margin={{bottom : 60}}
                              slotProps={{
                                legend : {
                                  hidden : true
                                }
                                
                                
                              }}
                              
                              />
                              
                            
          </Box>
        </div>
        <br/>
        <div className="w-full min-h-[20vh] bg-white rounded flex  justify-center items-center ">
          <Box
            sx={{textAlign : "center"}}
          >
            <h1 className="font-[600]">
              Statistik Produk Terlaris
            </h1>
          <PieChart
                              series={[
                                {
                                  data: data3,
                                  highlightScope: { faded: 'global', highlighted: 'item' },
                                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                  cx : "85%",
                                  cy : "80%"
                                  
                                  },
                              ]}
                              width={250}
                              height={200}
                              margin={{bottom : 60}}
                              slotProps={{
                                legend : {
                                  hidden : true
                                }
                                
                                
                              }}  
                              
                              />
                              
                            
          </Box>
        </div>
      </div>
      <div className="hidden md:flex"> 
        <div className="w-full min-h-[20vh] bg-white rounded flex  justify-center items-center  ">
          <Box
            sx={{textAlign : "center"}}
          >
            <h1 className="font-[600]">
              Statistik Stok Antar Produk
            </h1>
          <PieChart
                              series={[
                                {
                                  data: data2,
                                  highlightScope: { faded: 'global', highlighted: 'item' },
                                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                  cx : "75%",
                                  cy : "60%"
                                  
                                  },
                              ]}
                              width={300}
                              height={300}
                              margin={{bottom : 60}}
                              slotProps={{
                                legend : {
                                  
                                  position : { horizontal : "middle" , vertical : "bottom"},
                                  direction : "column",
                                  padding : {top : "30px"},
                                  hidden : true
                                }
                                
                                
                              }}
                              
                              />
                              
                            
          </Box>
        </div>
        <br/>
        <div className="w-full min-h-[20vh] bg-white rounded flex  justify-center items-center ">
          <Box
            sx={{textAlign : "center"}}
          >
            <h1 className="font-[600]">
              Statistik Produk Terlaris
            </h1>
          <PieChart
                              series={[
                                {
                                  data: data3,
                                  highlightScope: { faded: 'global', highlighted: 'item' },
                                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                  cx : "75%",
                                  cy : "60%"
                                  
                                  },
                              ]}
                              width={300}
                              height={300}
                              margin={{bottom : 60}}
                              slotProps={{
                                legend : {
                                  
                                  position : { horizontal : "middle" , vertical : "bottom"},
                                  direction : "column",
                                  padding : {top : "30px"},
                                  hidden : true
                                }
                                
                                
                              }}
                              />
                              
                            
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
