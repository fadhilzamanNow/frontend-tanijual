import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io"
import {BiMenuAltLeft} from "react-icons/bi"
import DropDown from "./Dropdown"
import Navbar from "./Navbar"
import {CgProfile} from "react-icons/cg"
const Header = ({activeHeading}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active,setActive] = useState(false);
  const [dropDown,setDropDown] = useState(false)

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });
    setSearchData(filteredProducts);
  };


  window.addEventListener("scroll", () => {
    if(window.screenY > 70){
        setActive(true)
    }
    else{
        setActive(false)
    }
  })
  return (
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
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            { searchData && searchData !==0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData && searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g,"-");
                        return (
                            <Link to={`/product/${Product_name}}`}>
                                <div className="w-full flex items-start py-3">
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
            <div className="flex flex-row  h-[45px] w-[200px] bg-green-500 items-center justify-center rounded-md">
                <Link to="/seller" className="flex flex-1 flex-row items-center justify-evenly">
                    <h1 className="text-white">
                    Daftar Sebagai Penjual </h1>
                    <IoIosArrowForward className="text-green-100 mt-1" size={16}/>
                </Link>
            </div>
            
      </div>
      
    </div>
    <div className={`${active ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex item-center justify-between w-full bg-green-500 h-[70px]`}>
      <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
        {/* categories */}
                <div>
                    <div className="relative h-[60px] mt-[10px] mb-[10px] w-[270px] hidden 1000px:block text-white">
                        <BiMenuAltLeft  size={30} className="absolute top-[16px] left-2"  color="white"/>
                        <button
                            className={`h-[100%] w-full flex justify-between items-center pl-10 bg-green-800 font-sans text-lg font-[500] select-none rounded-md`}
                        >
                            Semua Kategori

                        </button>

                        <IoIosArrowDown size={20}  className="absolute right-2 top-[23px] cursor-pointer text-white"  
                            onClick={() => setDropDown(!dropDown)}
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
                        <div className="relative cursor-pointer mr-[15px]">
                            <AiOutlineHeart 
                                size={30}
                                className="text-white"
                            />
                            <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">

                            </span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                            <AiOutlineShoppingCart
                                size={30}
                                className="text-white"
                            />
                            <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">

                            </span>
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                            <Link to="/login">
                            <CgProfile
                                size={30}
                                className="text-white"
                            />
                            </Link>
                            <span className="absolute right-0 top-0 rounded-full bg-blue-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">

                            </span>
                        </div>
                    </div>
                </div>
      </div>
      </div>
    </>
  );
};

export default Header;
