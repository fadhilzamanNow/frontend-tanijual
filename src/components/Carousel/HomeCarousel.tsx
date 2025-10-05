"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Carousel1 from "@/Assests/Home/Carousel1.png";
import Carousel2 from "@/Assests/Home/Carousel2.png";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";

//@ts-ignore
import "swiper/css/autoplay";

//@ts-ignore
import "./carousel.css";

import Image, { type StaticImageData } from "next/image";

interface ImageCarousel {
  imageUrl: StaticImageData;
  className: string;
  text: string;
}

const ImagesList: ImageCarousel[] = [
  {
    imageUrl: Carousel1,
    className: "",
    text: "Produk Segar dan Berkualitas",
  },
  {
    imageUrl: Carousel2,
    className: "",
    text: "Diproduksi dengan tahapan yang ketat dan steril",
  },
];

export default function HomeCarousel() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("changed")}
      modules={[Pagination, Autoplay]}
      pagination={{ dynamicBullets: true }}
      autoplay={{ delay: 2000 }}
    >
      {ImagesList.map((image, ind) => {
        return (
          <SwiperSlide>
            <Image
              src={image.imageUrl}
              alt=""
              className="object-cover  max-h-[40vh] rounded-xl "
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
