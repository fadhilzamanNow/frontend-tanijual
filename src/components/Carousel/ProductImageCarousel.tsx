"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { CiImageOff } from "react-icons/ci";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";
//@ts-ignore
import "swiper/css/navigation";
//@ts-ignore
import "swiper/css/autoplay";

//@ts-ignore
import "./carousel.css";

interface ProductImage {
  id: string;
  imageUrl: string;
  order: number;
}

interface ProductImageCarouselProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  const ImageFallback = () => (
    <div className="w-full h-100 bg-gray-200 rounded-xl flex flex-col items-center justify-center gap-2">
      <CiImageOff className="text-gray-500 text-5xl" />
      <p className="text-gray-500">Gambar tidak dapat dimuat</p>
    </div>
  );

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[300px] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // If only one image, don't use carousel
  if (images.length === 1) {
    if (imageErrors[images[0].id]) {
      return <ImageFallback />;
    }
    return (
      <img
        src={images[0].imageUrl}
        alt={productName}
        className="w-full h-[300px] object-cover rounded-xl"
        onError={() => handleImageError(images[0].id)}
      />
    );
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Pagination, Autoplay, Navigation]}
      pagination={{ dynamicBullets: true }}
      loop={true}
      className="product-image-carousel"
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.id} className=" h-full w-full">
          <div className="swiper-button-prev text-white  ">
            <MdNavigateBefore />
          </div>
          {imageErrors[image.id] ? (
            <ImageFallback />
          ) : (
            <img
              src={image.imageUrl}
              alt={`${productName} - Image ${index + 1}`}
              className="w-full h-100 object-cover rounded-xl"
              onError={() => handleImageError(image.id)}
            />
          )}
          <div className="swiper-button-next text-white ">
            <MdNavigateNext />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
