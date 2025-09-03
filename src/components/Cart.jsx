import { X, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

const Cart = ({ cart, isOpen, onClose, addToCart, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartRef = useRef(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  const deleteFromCart = (product) => {
    let quantityToRemove = product.quantity;
    for (let i = 0; i < quantityToRemove; i++) {
      removeFromCart(product);
    }
  };
  return (
    <>
      {/* Blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] lg:w-[450px] bg-white shadow-lg p-4 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"} cursor-pointer`}>
        {/* Header */}
        <div className="flex justify-between items-center pb-2 mb-4">
          <h2 className="text-lg font-semibold text-[20px] md:text-[25px]">
            Your Order
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center rounded-lg bg-[#fbfbfa] py-5 border-b border-b-gray-300">
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImg}
                    width={70}
                    alt=""
                    className="rounded-lg"
                  />
                  <div>
                    <p className="text-[16px]">{item.name}</p>
                    <p className="text-red-500 font-extrabold text-[14px]">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[18px]">
                  <button
                    className="px-2 py-1 shadow-sm bg-white cursor-pointer text-black rounded"
                    onClick={() => removeFromCart(item)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-[#54bca2] cursor-pointer text-white rounded"
                    onClick={() => addToCart(item)}>
                    +
                  </button>
                  <button
                    className="px-2 py-2 bg-red-500 cursor-pointer rounded text-white transition-colors"
                    onClick={() => deleteFromCart(item)}
                    title="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-[20px]">Total:</p>
            <p className="text-lg md:text-[23px] text-red-500 font-bold">
              ${total.toFixed(2)}
            </p>
          </div>
          <button className="w-full mt-5 bg-[#f76d22] text-white py-3 rounded cursor-pointer">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
