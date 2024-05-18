import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';


const ProductDetails = ({data}) => {
    console.log("the data", data)

    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const navigate = useNavigate()
    const [select,setSelect] = useState(0)

    const incrementCount = () => {
        setCount(count + 1);
    }

    const decrementCount = () => {
        setCount(count - 1);
    }

    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=501231231131e")
    }


  return (
    <div className="bg-white">
        {
            data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%] h-screen`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex pt-5">
                            <div className="w-full flex-col items-center 800px:w-[50%] 800px:flex-col 800px:items-center">
                                <div>
                                <img src={data.image_Url[select].url} alt="" className="w-[80%]"/>
                                </div>
                                <div className="w-full flex">
                                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={data?.image_Url[0].url} alt="" 
                                                className="h-[200px]"
                                                onClick={() => setSelect(0)}
                                            />
                                    </div>
                                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer self-center`}>
                                            <img src={data?.image_Url[1].url} alt="" 
                                                className="h-[200px]"
                                                onClick={() => setSelect(1)}
                                            />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full 800px:w-[50%]">
                                <h1 className={`${styles.productTitle}`}>
                                 {data.name}
                                </h1>
                                <p className="text-justify">
                                    {data.description}
                                </p>
                                <h4 className={`${styles.productDiscountPrice}`}>
                                    Rp. {data.discount_price}
                                </h4>
                                <h3 className={`${styles.price}`}>
                                    {data.price ? "Rp. " + data.price : null}
                                </h3>
                                <div className="flex items-center mt-12 justify-between pr-3">
                                <div>

                                
                                <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                    onClick ={() => decrementCount()}
                                >
                                       -
                                </button>
                                <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">{count}</span>
                                <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                    onClick = {() => incrementCount()}
                                >
                                        +
                                </button>
                                </div>
                            {click ? (
                            <AiFillHeart
                            size={30}
                            className="cursor-pointer " 
                            onClick={() => setClick(!click)}
                            color={click ? "red" : "gray"}
                            title='Remove dari Wishlist'
                            />
                        ) : (
                            <AiOutlineHeart 
                            className="cursor-pointer " 
                            size={30}
                            onClick={() => setClick(!click)}
                            color={click ? "red" : "gray"}
                            title='Tambahkan ke Wishlist'
                            />
                        )}

                            
                        </div> 

                        <div className={`rounded-xl mt-6 h-11 flex items-center w-[250px] bg-black text-white justify-between`}>
                            <div className="ml-4">
                                Tambahkan ke Keranjang
                            </div>
                            <div className="mr-4">
                                <AiOutlineShoppingCart />
                            </div>
                        </div> 
                        <div className="flex items-center pt-8">
                            <img src={data.shop.shop_avatar.url} alt="" 
                                className="w-[50px] h-[50px] rounded-full mr-2"
                            />
                            <div>
                            <h3 className={styles.shop_name}>
                                    {data.shop.name}
                                </h3>
                                <h5 className="pb-3 text-[15px]">
                                    ({data.shop.ratings}) Rating
                                </h5>
                            </div>
                            <div className="bg-green-400 w-[250px] p-4 rounded-xl items-center flex flex-col ml-3" onClick={handleMessageSubmit}>
                                <h1 className='text-[20px] text-white'>
                                    Tanya Penjual
                                </h1>
                            </div>
                        </div>
                            
                            </div>

                           
                            
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <ProductDetailsInfo data={data} />
                </div>
            ) : 
            (null)
        }
    </div>
  )
}

const ProductDetailsInfo = ({data}) => {
    const [active,setActive] = useState(1);


    return (
        <div className="bg-white px-3 800px:px-10 py-2 rounded ">
                <div className="w-full flex justify-between border-b pt-10 pb-2">
                    <div className="relative">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(1)} >
                            Detail Produk</h5>
                            {
                                active === 1 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="relative">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(2)} >
                            Review Produk</h5>
                            {
                                active === 2 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                    <div className="relative">
                        <h5 className={`text-black text-[18px] px-1 leading-5 font-[600] cursoir-pointer 800px:text-[20px] `} onClick={() => setActive(3)} >
                            Informasi Penjual</h5>
                            {
                                active === 3 ? (
                                    <div className={`${styles.active_indicator}`}>

                                    </div>
                                ) : (null)
                            }
                        
                    </div>
                </div>
                {
                    active === 1 ? (
                        <>
                        <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis exercitationem maiores, molestias accusamus, natus quod numquam debitis, officiis corporis tempora laboriosam. Ab rerum itaque aut soluta eligendi quisquam placeat quibusdam.
                        Hic, in inventore facere possimus ratione, esse quos provident pariatur unde ducimus similique amet est ipsum deserunt. Explicabo architecto doloribus voluptates. At ducimus adipisci sunt voluptatibus ullam iure! Odio, ipsum.
                        Veritatis aliquid laboriosam recusandae amet velit qui, id assumenda nihil explicabo necessitatibus possimus, commodi in dolorem consectetur sint libero accusamus, quia reiciendis provident similique ex illo autem ab reprehenderit? Maxime!
                        Beatae voluptatum id autem harum nostrum architecto molestiae voluptates natus earum ab blanditiis enim quis reprehenderit in nesciunt eveniet exercitationem veritatis sed iusto hic officiis quam, illo eligendi? Incidunt, id.
                        Repellat aliquid nesciunt aut. Delectus incidunt recusandae laboriosam aliquid quisquam illum. Mollitia doloribus iusto labore facere corporis, reiciendis, nisi fugiat tempore magni quaerat quisquam quod a, nobis consequuntur aliquam odio!
                        </p>
                        <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis exercitationem maiores, molestias accusamus, natus quod numquam debitis, officiis corporis tempora laboriosam. Ab rerum itaque aut soluta eligendi quisquam placeat quibusdam.
                        Hic, in inventore facere possimus ratione, esse quos provident pariatur unde ducimus similique amet est ipsum deserunt. Explicabo architecto doloribus voluptates. At ducimus adipisci sunt voluptatibus ullam iure! Odio, ipsum.
                        Veritatis aliquid laboriosam recusandae amet velit qui, id assumenda nihil explicabo necessitatibus possimus, commodi in dolorem consectetur sint libero accusamus, quia reiciendis provident similique ex illo autem ab reprehenderit? Maxime!
                        Beatae voluptatum id autem harum nostrum architecto molestiae voluptates natus earum ab blanditiis enim quis reprehenderit in nesciunt eveniet exercitationem veritatis sed iusto hic officiis quam, illo eligendi? Incidunt, id.
                        Repellat aliquid nesciunt aut. Delectus incidunt recusandae laboriosam aliquid quisquam illum. Mollitia doloribus iusto labore facere corporis, reiciendis, nisi fugiat tempore magni quaerat quisquam quod a, nobis consequuntur aliquam odio!
                        </p>
                        
                        </>
                    ) : (null)
                }
                {
                    active === 2 ? (
                        <>
                        <p>
                        Belum ada review
                        </p>
                        
                        </>
                    ) : (null)
                }
                {
                    active === 3 ? (
                        <>
                       <div className="w-full block 800px:flex p-5 h-[50vh]">
                            <div className="w-full 800px:w-[50%] h-[50vh]">
                                <div className="flex items-center pl-3">
                                    <img src={data.shop.shop_avatar.url} alt="" className="w-[50px] h-[50px] rounded-full object-cover" />
                                    <div>
                                        <h3 className={`${styles.shop_name}`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            ({data.shop.ratings}) Ratings
                                        </h5>
                                    </div>
                                </div>
                                <div className="pt-2">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iusto tenetur nihil similique ipsam soluta ex dolor saepe eligendi aperiam architecto, laudantium molestias incidunt, impedit quibusdam quae hic! Natus, modi.
                                    </div>
                                
                            </div>
                            <div className="w-full 800px:w-[50%]">
                                <div className="text-left">
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Bergabung sejaka <span className="font-[500]"> 14 Mei 2024</span>
                                    </h5>
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Total Produk yang dijual <span className="font-[500]"> 12</span>
                                    </h5>
                                    <h5 className="font-[600] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                        Total Review <span className="font-[500]"> 153</span>
                                    </h5>
                                    <Link to="/">
                                        <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3 items-end`}>
                                            <h4 className="text-white">Cek Toko</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                       </div>
                        
                        </>
                    ) : (null)
                }
        </div>
    )
}

export default ProductDetails