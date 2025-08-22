import React from "react";
import login from "../images/login.svg";
const Signin = () => {
  return (
    <>
      <div>
        {" "}
        <div className="flex flex-col mb-4 gap-1">
          <label htmlFor="" className="text-[14px]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-1 px-2 focus:border-[#f66c21] focus:border"
          />
        </div>{" "}
        <div className="flex flex-col mb-5 gap-1">
          <label htmlFor="" className="text-[14px]">
            Password
          </label>
          <input
            type="text"
            placeholder="Create a password"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-1 px-2 focus:border-[#f66c21] focus:border"
          />
        </div>
        <div className="bg-[#f66c21] rounded-lg py-2 w-full flex gap-2 justify-center items-center">
          {" "}
          <img src={login} className="text-white" width={17} alt="" />
          <button className=" text-white text-[14px]">Login</button>
        </div>
      </div>
    </>
  );
};

export default Signin;
