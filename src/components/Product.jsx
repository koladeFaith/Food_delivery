import React from "react";
import { toast } from "sonner";

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
  // Add toast when adding to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Added ${name} to cart`);
  };

  // Add toast when removing from cart (only when quantity reaches 0)
  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    if (cartItem && cartItem.quantity === 1) {
      toast.info(`Removed ${name} from cart`);
    }
  };

  return (
    <>
      <li className=" my-5 hover:transition-transform  overflow-hidden border border-[#e9e8e7] bg-[#fbfbfa] rounded-xl ">
        <div className="max-w-lg max-h-lg">
          {" "}
          <img
            src={productImg}
            alt=""
            width={300}
            height={150}
            className="w-full object-cover rounded-t-xl hover:duration-100 hover:ease-in-out hover:scale-105 overflow-hidden"
          />
        </div>
        <div className="mx-4">
          <h2 className="text-[#292523] font-bold pt-4 pb-3">
            {name || "jrrr"}
          </h2>
          <p className="text-[#8a827d] text-[12px] leading-4">{description}</p>
          <div className="py-5 flex justify-between  items-center`">
            {" "}
            <p className="text-red-500 font-extrabold text-[20px]">${price}</p>
            {!soldOut && (
              <div className=" flex items-center gap-2">
                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 shadow-sm cursor-pointer bg-white text-black font-extrabold rounded"
                      onClick={() => handleRemoveFromCart({ name })}>
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      className="px-2 py-1 bg-[#54bca2] cursor-pointer text-white rounded"
                      onClick={() =>
                        handleAddToCart({
                          name,
                          productImg,
                          description,
                          price,
                        })
                      }>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-3 py-1 bg-[#f76d22] cursor-pointer text-white rounded"
                    onClick={() =>
                      handleAddToCart({ name, productImg, description, price })
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
