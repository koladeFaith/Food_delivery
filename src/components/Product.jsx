import React from "react";

const Product = ({ productImg, name, price, description }) => {
  return (
    <>
      <li className=" my-5 hover:transition-transform hover:duration-100 hover:ease-in-out hover:scale-105 border border-[#e9e8e7] bg-[#fbfbfa] rounded-xl ">
        <img
          src={productImg}
          alt=""
          className="w-full object-cover rounded-t-xl "
        />
        <div className="mx-4">
          <h2 className="text-[#292523] font-bold pt-4 pb-3">
            {name || "jrrr"}
          </h2>
          <p className="text-[#8a827d] text-[12px] leading-4">{description}</p>
          <div className="py-5 flex justify-between  items-center`">
            {" "}
            <p className="text-[#df6d52] font-extrabold text-[20px]">
              ${price}
            </p>
            <p className="text-[22px] bg-[#f76c21] w-[35px] text-white rounded-lg text-center">
              +
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Product;
