import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import backImg from "../images/back.svg";
import { useUser } from "../contexts/useUser";

const Auth = ({ setOpen }) => {
  const [activeTab, setActiveTab] = useState("login");
  const { user } = useUser(); 
  const handleAuthSuccess = () => {
    setOpen(false); 
  };
  // Close auth modal if user is logged in
  React.useEffect(() => {
    if (user) {
      setOpen(false);
    }
  }, [user, setOpen]);

  return (
    <>
      <div className="bg-black/50 z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center ">
        <div className="border-[#e63a0faa] bg-white border rounded-lg flex flex-col px-10 w-[450px] h-[487px] ">
          <img
            src={backImg}
            alt="Close"
            width={20}
            className="mt-3 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <h2 className="text-[#323232] text-[22px] font-medium text-center">
            Welcome to Delicious Food
          </h2>

          <div className="flex justify-center items-center my-4">
            <div className="bg-[#f5f4f2] flex justify-between items-center gap-20 px-12 rounded-lg w-full max-w-sm md:max-w-md py-2">
              <button
                className={`text-[15px] px-4 rounded-lg transition-colors ${
                  activeTab === "login"
                    ? "bg-[#ffffff] text-black"
                    : "text-[#9e938e] hover:text-black"
                }`}
                onClick={() => setActiveTab("login")}>
                Login
              </button>
              <button
                className={`text-[15px] px-4 rounded-lg transition-colors ${
                  activeTab === "signup"
                    ? "bg-[#ffffff] text-black"
                    : "text-[#9e938e] hover:text-black"
                }`}
                onClick={() => setActiveTab("signup")}>
                SignUp
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "login" && <Signin onSuccess={handleAuthSuccess} />}
            {activeTab === "signup" && <Signup onSuccess={handleAuthSuccess} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
