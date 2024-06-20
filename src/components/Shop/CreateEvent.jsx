import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { createevent } from '../../redux/actions/event'

const CreateEvent = () => {
    const {seller} = useSelector((state) => state.seller)
    const {success, error} = useSelector((state) => state.events)

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [images,setImages] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [tags,setTags] = useState("");
    const [originalPrice,setOriginalPrice] = useState();
    const [discountPrice,setDiscountPrice] = useState();
    const [stock,setStock] = useState();
    const [startDate,setStartDate] = useState(null)
    const [endDate,setEndDate] = useState(null)
    useEffect(() => {
        if(error){
            toast.error(error);
        }
        if(success){
            toast.success("Promo telah berhasil dibuat");
            navigate("/dashboard-events");
            window.location.reload();
        }
    },[dispatch,error,success])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append("images",image);
        })

        const data = {
            name,
            description,
            category,
            tags,
            originalPrice,
            discountPrice,
            stock,
            images,
            shopId: seller._id,
            start_Date: startDate?.toISOString(),
            Finish_Date: endDate?.toISOString(),
          };

    
        dispatch(createevent(data))
    }

    const handleImageChange = (e) => {
        e.preventDefault()
        const files = Array.from(e.target.files);
        setImages([]);

       files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImages((lama) => [...lama,reader.result])
                }
            }
       })

        /* let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages,...files]) */
    }

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value)
        const minEndDate = new Date(startDate.getTime() + 3*24*60*60*1000)
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    }

    const today = new Date().toISOString().slice(0,10);

    const minEndDate = startDate ? new Date(startDate.getTime() + 3*24*60*60*1000).toISOString().slice(0,10) : today
  return (
    <div className="800px:w-[75%] w-[100%] bg-white shadow  rounded-[4px] p-3 ">
        <h5 className="text-[30px] font-Poppins text-center">
           Membuat Promo 
        </h5>
        {/* Form Untuk Membuat Produk */}
        <form action="" onSubmit={handleSubmit}>
            <br />
            <div>
                <label htmlFor="name" className='pb-2'>
                    Nama <span className='text-red-400'>*</span>
                </label>
                <input type="text" name='name' value={name} onChange={(e)=> setName(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Nama Produk'/>
            </div>
            <br />
            <div>
                <label htmlFor="description" className='pb-2'>
                    Deskripsi <span className='text-red-400'>*</span>
                </label>
                <textarea
                cols="30"
                required
                rows="8"
                type="text"
                name="description"
                value={description}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan Deskripsi Dari Produk Promo Ini......"
            ></textarea>
            </div>
            <br />
            <div>
                <label htmlFor="name" className='pb-2'>
                    Kategori <span className='text-red-400'>*</span>
                </label>
                <select name="category" id="" className="w-full mt-2 border h-[35px] rounded-[5px]" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Pilih Kategori Produk">Pilih Kategori Produk </option>
                        {
                            categoriesData && categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ) )
                        }
                   
                </select>
            </div>
            <br />
            <div>
                <label htmlFor="tags" className='pb-2'>
                    Tags <span className='text-red-400'>*</span>
                </label>
                <input type="text" name='tags' value={tags} onChange={(e)=> setTags(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Berikan nama Tag Produk'/>
            </div>
            <br />
            <div>
                <label htmlFor="price" className='pb-2'>
                    Harga Asli 
                </label>
                <input type="number" name='price' value={originalPrice} onChange={(e)=> setOriginalPrice(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Harga Produk Asli'/>
            </div>
            <br />
            <div>
                <label htmlFor="price" className='pb-2'>
                    Harga Produk Final (Dengan Diskon) <span className='text-red-400'>*</span>
                </label>
                <input type="number" name='price' value={discountPrice} onChange={(e)=> setDiscountPrice(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Harga Produk Final'/>
            </div>
            <br />
            <div>
                <label htmlFor="stock" className='pb-2'>
                    Stok Produk <span className='text-red-400'>*</span>
                </label>
                <input type="number" name='stock' value={stock} onChange={(e)=> setStock(e.target.value)} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Stok Produk'/>
            </div>
            <br />
            <div>
                <label htmlFor="start-date" className='pb-2'>
                    Tanggal Mulai Promo <span className='text-red-400'>*</span>
                </label>
                <input type="date" name='start-date' id="start-date" value={startDate ? startDate.toISOString().slice(0,10)  : ""} onChange={handleStartDateChange} min={today} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Stok Produk'/>
            </div>
            <br />
            <div>
                <label htmlFor="end-date" className='pb-2'>
                    Tanggal Berakhir Promo <span className='text-red-400'>*</span>
                </label>
                <input type="date" name='end-date' id="end-date" value={endDate ? endDate.toISOString().slice(0,10)  : ""} onChange={handleEndDateChange} min={minEndDate} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm' placeholder='Tuliskan Stok Produk'/>
            </div>
            <br />
            <div>
                <label htmlFor="images" className='pb-2'>
                    Upload Gambar <span className='text-red-400'>*</span>
                </label>
                <input type="file" name='' className='hidden' id="upload" multiple onChange={handleImageChange}/>
                <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                        <AiOutlinePlusCircle 
                            size={30}
                            className='mt-3'
                            color="#555"
                        />
                    </label>
                    {   
                        images && images.map((i) => (
                            <img src={i} key={i} alt="" className="h-[50px] w-[50px] object-cover m-2 rounded-full" />
                        ))
                    }
                </div>
                <br />
                <div className="pb-8">
                <input type="submit" value="Buat Promo" className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-green-400 focus:border-green-400 sm:text-sm bg-green-500 text-white font-[600]' />
                </div>
            </div>
            
        </form>
    </div>
  )
}

export default CreateEvent