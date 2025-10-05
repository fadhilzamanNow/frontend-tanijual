import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { backend_url } from "../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist.js";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart.js";
import Ratings from "../../Products/Ratings.jsx";
import CountDown from "../Events/CountDown.jsx";
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";

const ProductCard = ({ data, toko, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  console.log("berhasil masuk sini");

  const dispatch = useDispatch();

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const deleteFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Produk sudah ditambahkan ke dalam keranjang !");
    } else {
      if (data.stock < 1) {
        toast.error("Jumlah yang masukkan melebihi stok");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Produk berhasil ditambahkan");
      }
    }
  };

  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${data._id}`);
  };
  console.log("data disini", data);
  return (
    <>
      <div
        className={`w-full ${isEvent ? "h-auto]" : "h-[320px]"} bg-white rounded-lg   relative cursor-pointer shadow-2xl mb-12`}
      >
        <div className="">
          <div className="w-full  flex items-center justify-center">
            <img
              src={
                data?.images?.[0]?.imageUrl ||
                "https://via.placeholder.com/400x170?text=No+Image"
              }
              alt={data?.name || "Product"}
              className="w-full h-[170px] object-cover items-center justify-center rounded-md shadow-sm"
              onClick={isEvent ? null : () => handleClick()}
            />
          </div>
          <div className="ml-2 py-2 flex flex-col gap-y-2">
            <h4 className=" font-[500] text-justify text-[16px] ">
              {data.name.length > 49
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </h4>
            <div className=" flex items-center justify-between">
              <div className="flex text-[8px]">
                <h5
                  className={`${styles.productDiscountPrice} !text-[12px] !sm:text-[18px`}
                >
                  Rp. {data.discountPrice}
                </h5>
                <h4
                  className={`${styles.price} !text-gray-400 !text-[12px] !sm:text-[18px`}
                >
                  Rp. {data.originalPrice} asda
                </h4>
              </div>
            </div>
            <div className="flex items-center justify-start gap-x-1">
              {data?.ratings ? (
                <div className="flex items-center  !text-[12px]">
                  <RiStarSFill className="text-yellow-400" size={15} />
                  <span>{data?.ratings}</span>
                </div>
              ) : (
                <>
                  <RiStarSLine size={20} className="text-yellow-400" />
                </>
              )}
              <div>
                <GoDotFill className="text-black" size={10} />
              </div>
              <div className="font-[400] text-[12px] sm:text-[18px text-gray-500 ">
                {data.sold_out ? data.sold_out + " terjual" : "0 terjual"}
              </div>
            </div>
            <Link to={`/shop/preview/${data.shopId}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  alt=""
                  className="h-[20px] w-[20px] rounded-[9999px]"
                />
                <h5 className={`text-[12px] sm:text-[14px] !text-gray-500 `}>
                  {data.shop.name}
                </h5>
              </div>
            </Link>
            <Link to={`/product/${data._id}`}>
              {toko ? <CountDown data={data} toko={true} /> : null}
            </Link>
          </div>
          {/* opsi samping */}

          {isEvent ? null : (
            <>
              {click ? (
                <AiFillHeart
                  size={22}
                  className={`cursor-pointer absolute right-2 top-5 ${click ? "text-red-500" : "text-white"} hover:text-red-400`}
                  onClick={() => deleteFromWishlistHandler(data)}
                  title="Remove dari Wishlist"
                />
              ) : (
                <AiOutlineHeart
                  className="cursor-pointer absolute right-2 top-5  text-white hover:text-red-400"
                  onClick={() => addToWishlistHandler(data)}
                  title="Tambahkan ke Wishlist"
                />
              )}

              <IoSearchOutline
                size={18}
                className="cursor-pointer absolute right-2 top-14  text-white hover:text-red-400"
                onClick={() => setOpen(!open)}
                title="Melihat Detail"
              />

              <AiOutlineShoppingCart
                className="cursor-pointer absolute right-2 top-24 text-white hover:text-red-400"
                onClick={() => addToCartHandler(data._id)}
                title="Tambahkan ke Keranjang"
              />

              {open ? (
                <ProductDetailsCard setOpen={setOpen} data={data} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
