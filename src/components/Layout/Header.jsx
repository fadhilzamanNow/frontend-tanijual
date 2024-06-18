import React, { useRef, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io"
import {BiMenuAltLeft} from "react-icons/bi"
import DropDown from "./Dropdown"
import Navbar from "./Navbar"
import {CgProfile} from "react-icons/cg"
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import Cart from "../cart/Cart"
import { RxCross1 } from "react-icons/rx";
import Wishlist from "../Wishlist/Wishlist"
const Header = ({activeHeading}) => {
  const {isAuthenticated, user} = useSelector((state) => state.user);
  const {cart} = useSelector ((state) => state.cart)
  const {wishlist} = useSelector((state) => state.wishlist);
  const {isSeller} = useSelector((state) => state.seller); 
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active,setActive] = useState(false);
  const [dropDown,setDropDown] = useState(false)
  const inputChange = useRef(null)

  const [openCart,setOpenCart] = useState(false);
  const [openWishlist,setOpenWishlist] = useState(false);
  const [open,setOpen] = useState(false)

  const handleSearchChange = (e) => {
    inputChange.current = e.target.value;
    setSearchTerm(inputChange.current);

    const filteredProducts =
     ( productData &&
      productData.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      }) )
    setSearchData(filteredProducts);
  };


  window.addEventListener("scroll", () => {
    if(window.scrollY > 70){
        setActive(true)
    }
    else{
        setActive(false)
    }
  })


  const handleSubmit = () => {
    setSearchTerm(null)
    console.log("hapus")
    console.log(searchData)
  }
  return (
    <>
         <>
                 <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
          <Link to="/" className="flex flex-row text-4xl font-extrabold">
            <p className="text-green-500">Jual</p>
            <p className="text-green-200">Tani</p>
          </Link>
        </div>
        <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Mencari Buah dan Sayuran ...."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-green-200 border-[2px] rounded-md focus:border-green-500 "
              ref={inputChange}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
              onClick={handleSubmit}
            />
            { searchData && searchData.length !==0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData && searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g,"-");
                        return (
                            <Link to={`/product/${Product_name}}`}>
                                <div className="w-full flex items-start py-3" key={index}>
                                    <img src={i.image_Url[0].url} alt="" 
                                        className="w-[40px] h-[40px] mr-[10px]"
                                    />
                                    <div>
                                        {i.name}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            ) : (null)}
          </div>
            <div className={`flex flex-row  h-[45px] w-[200px] ${isSeller ? ("bg-black") : ("bg-green-500")} items-center justify-center rounded-md`}>
                {
                    isSeller ? (
                        <Link to="/dashboard" className="flex flex-1 flex-row items-center justify-evenly">
                    <h1 className="text-white">
                   Cek Dashboard Penjual
                    </h1>
                    <IoIosArrowForward className="text-green-100 mt-1" size={16}/>
                </Link>
                    ) : (
                    <Link to="/shop-login" className="flex flex-1 flex-row items-center justify-evenly">
                    <h1 className="text-white">
                   Masuk Sebagai Penjual 
                    </h1>
                    <IoIosArrowForward className="text-green-100 mt-1" size={16}/>
                </Link>)
                }
                
            </div>
            
      </div>
      
    </div>
    <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex item-center justify-between w-full bg-green-500 h-[70px]`}>
      <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
        {/* categories */}
                <div>
                    <div className="relative h-[60px] mt-[10px] mb-[10px] w-[270px] hidden 1000px:block text-white">
                        <BiMenuAltLeft  size={30} className="absolute top-[16px] left-2"  color="white"/>
                        <button
                            className={`h-[100%] w-full flex justify-between items-center pl-10 bg-green-800 font-sans text-lg font-[500] select-none rounded-md`} onClick={() => setDropDown(!dropDown)}
                        >
                            Semua Kategori

                        </button>

                        <IoIosArrowDown size={20}  className="absolute right-2 top-[23px] cursor-pointer text-white"  
                            
                        />

                        {
                            dropDown ? (
                            <DropDown 
                            categoriesData ={categoriesData}
                            setDropDown= {setDropDown}
                            />

                            
                        ) : (null)
                        }

                    </div>
                    
                </div>
                {/* navitems */}
                <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading}/>
                        </div>
                <div className="flex flex-row">
                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishlist(true)}>
                            <AiOutlineHeart 
                                size={30}
                                className="text-white"
                            />
                            <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                            {wishlist && wishlist.length}
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                            <AiOutlineShoppingCart
                                size={30}
                                className="text-white"
                                onClick ={() => setOpenCart(true)}
                            />
                            <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {cart && cart.length}
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                        {isAuthenticated ? (
                                 <Link to={`/profile`}>
                                    <img src={`${user?.avatar?.url}`} alt="" className="w-[30px] h-[30px] rounded-full" />
                                 </Link>
                            ) : (
                                <Link to="/login">
                                 <CgProfile
                                     size={30}
                                     className="text-white"
                                 />
                                 </Link>
                            )
                            }
                           
                        
                        </div>
                    </div>

                    {/* keranjang */}

                    {
                        openCart ? (
                            <Cart setOpenCart={setOpenCart} />
                        ) : (null)
                    }
                    

                    { /* wishlist */}
                    {
                        openWishlist ? (<Wishlist setOpenWishlist={setOpenWishlist} />) : (null)
                    }
                </div>
      </div>
      </div>

      {/*  tampilan untuk di mobile */}

      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[70px] fixed bg-[#fffefe] z-50 top-0 left-0 shadow-sm 800px:hidden items-center flex justify-center`}>
            <div className="w-full flex items-center justify-between">
                    <div>
                        <BiMenuAltLeft 
                            size={40}
                            className="ml-[20px]"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                    <div>
                    <Link to="/" className="flex flex-row text-4xl font-extrabold">
                        <p className="text-green-500">Jual</p>
                        <p className="text-green-200">Tani</p>
                    </Link>
                    </div>
                    <div className="flex">
                        <div className="relative mr-[20px]" onClick ={() => setOpenCart(true) || console.log('ddipencet')}>
                            <AiOutlineShoppingCart 
                                size={30}
                                
                            />
                              <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                {cart && cart.length}
                            </span>
                        </div>
                        <div className="relative cursor-pointer mr-[15px]">
                        {isAuthenticated ? (
                                 <Link to={`/profile`}>
                                    <img src={`${user?.avatar?.url}`} alt="" className="w-[30px] h-[30px] rounded-full" />
                                 </Link>
                            ) : (
                                <Link to="/login">
                                 <CgProfile
                                     size={30}
                                     className="text-white"
                                 />
                                 </Link>
                            )
                            }
                           
                        
                        </div>
                    </div>
            </div>

            {
                open && (
                    <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 ">
                        <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
                            <div className="w-full justify-between flex pr-3">
                                <div>
                                    <div className="relative mr-[15px]">
                                        <AiOutlineHeart 
                                            size={30}
                                            className="mt-5 ml-3 relative" 
                                        />
                                        <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                        {wishlist && wishlist.length}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <RxCross1 
                                        size={30}
                                        className="ml-4 mt-5"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                            </div>

                            <div className="my-8 w-[92%] m-auto h-[40px]">
                                <input  type="search" 
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="h-[40px] w-full px-2 border-green-200 border-[2px] rounded-md focus:border-green-500 "
                                        placeholder="Mencari buah dan sayuran ...."
                                />
                                { searchData && searchData.length !==0 ? (
                                    <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                    {searchData && searchData.map((i, index) => {
                                        const d = i.name;

                                        const Product_name = d.replace(/\s+/g,"-");
                                        return (
                                            <Link to={`/product/${Product_name}`}>
                                                <div className="w-full flex items-start py-3" key={index}>
                                                    <img src={i.image_Url[0].url} alt="" 
                                                        className="w-[40px] h-[40px] mr-[10px]"
                                                    />
                                                    <div>
                                                        {i.name}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                </div>
            ) : (null)}
                            </div>
                            <div>
                            <Navbar active={activeHeading}/>
                            </div>
                            <br />
                            <br />
                            <div className=" flex text-[18px] w-full justify-center gap-x-2 items-center">

                            {
                                isAuthenticated === true ? (
                                    <div className="flex-col items-center justify-center">
                                    <Link to={`/profile`}>
                                    <img src={`${backend_url}/${user.avatar}`} alt="" className="w-[75px] h-[75px] rounded-full object-cover border" />
                                    </Link>
                                    
                                   </div>
                                ) : (
                                    <>
                                    <Link to="/login">Masuk</Link>
                                    / 
                                    <Link to="/sign-up">Daftar</Link>
                                    </>
                                )
                            }
                            </div>

                        </div>
                    </div>
                )
            }
      </div>
            </>
    </>
  );
};

export default Header;
