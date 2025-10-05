import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (e) => {
    navigate(`/products?category=${e.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => {
          return (
            <div
              key={index}
              className={`${styles.noramlFlex} p-4 gap-x-3`}
              onClick={() => submitHandle(i)}
            >
              <img
                src={i.image_Url}
                alt=""
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "NONE",
                }}
              />
              <h3 className=" cursor-pointer select-none text-black ">
                {i.title}
              </h3>
            </div>
          );
        })}
    </div>
  );
};

export default Dropdown;
