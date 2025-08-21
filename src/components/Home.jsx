import React, { useState } from "react";
import img from "../images/imgi_1_restaurant-hero-DtyuuM56.jpg";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import Products from "./Products";
const Home = () => {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <>
      <div
        className="relative md:h-[380px] h-[420px] bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${img})` }}>
        <div className="absolute  inset-0 bg-[#f54926]/85"></div>
        <div className="relative z-10 ">
          <div className="flex  justify-end align-items-end">
            {" "}
            <button className="bg-[#f6672c] mt-5 px-4  text-[#fff1ba] py-1 rounded-lg cursor-pointer fixed  right-5 shadow-lg flex gap-2 justify-center  items-center">
              <FiUser />
              Login
            </button>
          </div>
          <div className=" pt-15 md:pt-18 pl-5 md:pl-10  lg:pl-30 text-white">
            <h1 className="text-[45px] leading-10  font-bold">
              {" "}
              Delicious Food Delivered
            </h1>
            <p className="text-[16px]  md:text-[18px] md:py-4  font-meduim pt-2 text-[#ffd3c5]">
              Fresh ingredients, amazing flavors, and fast delivery to your door
            </p>
            <div
              className="list-none
          md:flex  gap-5 cursor-pointer  font-light md:mb-5">
              <li className="flex gap-2  items-center">
                <FiClock />
                <p className="text-[#ffd3c5] font-medium pt-3 md:py-0">
                  30-45 min delivery
                </p>
              </li>
              <li className="flex gap-2   items-center  ">
                <FaMapMarkerAlt className="" />
                <p className="text-[#ffd3c5] font-medium md:pb-0">
                  {" "}
                  Free delivery over $25
                </p>
              </li>
              <li className="flex gap-2   items-center ">
                <FaStar />
                <p className="text-[#ffd3c5] font-medium">4.9 rating</p>
              </li>
            </div>
            <button className="rounded-lg text-[#ffff] bg-[#2ec2b2] px-7 py-3 mt-2 flex gap-3 items-center cursor-pointer ">
              <FaPhoneAlt />
              Call to order: +234 222 3333 444
            </button>
          </div>
        </div>
        {/* Search */}
        <div className=" flex justify-center items-center ">
          {" "}
          <div className="relative mt-[90px] md:mt-[150px]   w-full max-w-sm md:max-w-md ">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search new menu..."
              className="w-full pl-10 pr-4 px-10 py-1 md:py-2 rounded-lg border text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f54926]"
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="flex justify-center items-center my-5">
          {" "}
          <div className="bg-[#f5f4f2] flex  justify-between items-center px-12 rounded-lg w-full max-w-sm md:max-w-md py-2">
            <button
              className="text-[#9e938e] text-[15px] focus:bg-[#ffffff] focus:px-10 rounded-lg  focus:text-black"
              onClick={() => setActiveTab("all")}>
              All items
            </button>
            <button
              className="text-[#9e938e] text-[15px] focus:bg-[#ffffff] focus:px-10  rounded-lg focus:text-black"
              onClick={() => setActiveTab("mains")}>
              Mains
            </button>
            <button
              className="text-[#9e938e] text-[15px] focus:bg-[#ffffff] focus:px-10  rounded-lg focus:text-black"
              onClick={() => setActiveTab("salads")}>
              Salads
            </button>
          </div>
        </div>
        <div>
          {activeTab === "all" && <Products />}
          {activeTab === "mains" && <Products />}
          {activeTab === "salads" && <Products />}
        </div>

        <div className="   text-white py-4  fixed bottom-0 right-0 mr-5  flex justify-center items-center  rounded-full bg-[#f56a27]  w-[50px] ">
          <FiShoppingCart className="text-xl  text-white w-[20px]" />
        </div>
      </div>
    </>
  );
};

export default Home;
