import React from "react";

import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";

const EventCard = ({active,data}) => {
  console.log("daleman" , data)
  return (
    <div className={`w-[250px] block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2`}>
      <div className="w-[100%] lg:-w[50%] m-auto">
        <img 
         src={`${data?.images[0]?.url}`}
        alt=""
        className="rounded h-[200px] w-full bg-cover bg-center" />
         
      </div>
      <div className="w-full lg:[w-30%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="text-justify">
          {data?.description}
        </p>
        <div className="flex py-2 justify-between">
            <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    Rp. {data?.originalPrice}
                </h5>
                <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                      Rp. {data?.discountPrice}
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} terjual
            </span>
        </div>
        <CountDown data={data} />
        <br />
      </div>
    </div>
  );
};

export default EventCard;
