import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => {
          return (
            <div className="flex">
              <Link
                to={i.url}
                className={`${active === index + 1 ? "text-gray-800" : "text-gray-300"} font-[600] px-6 cursor-pointer pb-[20px] 800px:pb-0`}
              >
                {i.title} asda
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Navbar;
