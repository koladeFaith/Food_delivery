import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import backImg from "../images/back.svg";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("login");
  
  return (
    <>
      <div className="border-[#e63a0faa] border rounded-lg   flex flex-col  px-6 w-[450px] h-[425px] mt-[200px]">
        <img src={backImg} alt="" width={20} className="mt-3" />

        <h2 className="text-[#323232] text-[22px] font-medium text-center">
          Welcome to Delicious Food
        </h2>

        <div className="flex justify-center items-center my-5">
          {" "}
          <div className="bg-[#f5f4f2] flex  justify-between items-center gap-20 px-12 rounded-lg w-full max-w-sm md:max-w-md py-2">
            <button
              className="text-[#9e938e] text-[15px] focus:bg-[#ffffff] focus:px-10 rounded-lg  focus:text-black"
              onClick={() => setActiveTab("login")}>
              Login
            </button>
            <button
              className="text-[#9e938e] text-[15px] focus:bg-[#ffffff] focus:px-10  rounded-lg focus:text-black"
              onClick={() => setActiveTab("signup")}>
              Sign Up
            </button>
          </div>
        </div>
        <div>
          {activeTab === "login" && <Signin />}{" "}
          {activeTab === "signup" && <Signup />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
