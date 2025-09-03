import React from "react";

const Product = ({
  productImg,
  name,
  price,
  description,
  soldOut,
  addToCart,
  removeFromCart,
  cartItem,
}) => {
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
            {!soldOut && (
              <div className="mt-3 flex items-center gap-2">
                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeFromCart({ name })}>
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() =>
                        addToCart({ name, productImg, description, price })
                      }>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    onClick={() =>
                      addToCart({ name, productImg, description, price })
                    }>
                    +
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default Product;
