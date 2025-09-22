import { X, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "./useCart";
import CheckoutModal from "./CheckoutModal";
import { useUser } from "../contexts/useUser";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose, direction = "ltr" }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { cart, addToCart, removeFromCart, deleteFromCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartRef = useRef(null);
  const [showCheckout, setShowCheckout] = useState(false);

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

  // Function to completely remove an item from cart with toast notification
  const handleDeleteFromCart = (item) => {
    deleteFromCart(item);
    toast.error(`Removed ${item.name} from cart`, {
      position: direction === "rtl" ? "top-left" : "top-right",
      duration: 2000,
    });
  };

  // Function to add item with toast notification
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Added ${item.name} to cart`, {
      position: direction === "rtl" ? "top-left" : "top-right",
      duration: 1500,
    });
  };

  // Function to remove item with toast notification
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    if (item.quantity === 1) {
      toast.info(`Removed ${item.name} from cart`, {
        position: direction === "rtl" ? "top-left" : "top-right",
        duration: 1500,
      });
    }
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (!user) {
      toast.warning("Login Required!", {
        position: direction === "rtl" ? "top-left" : "top-right",
      });
      navigate("/login");
    } else {
      if (cart.length > 0) {
        setShowCheckout(true);
      } else {
        toast.warning("Your cart is empty!", {
          position: direction === "rtl" ? "top-left" : "top-right",
        });
      }
    }
  };

  // Determine direction classes
  const isRTL = direction === "rtl";
  const cartPositionClass = isRTL
    ? "left-0 transform transition-transform duration-300"
    : "right-0 transform transition-transform duration-300";

  const cartTransformClass = isRTL
    ? isOpen
      ? "translate-x-0"
      : "-translate-x-full"
    : isOpen
    ? "translate-x-0"
    : "translate-x-full";

  const headerClass = isRTL ? "flex-row-reverse" : "flex-row";
  const itemLayoutClass = isRTL ? "flex-row-reverse" : "flex-row";
  const controlsClass = isRTL ? "items-start" : "items-end";
  const totalClass = isRTL ? "flex-row-reverse" : "flex-row";

  return (
    <>
      {/* Blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Cart */}
      <div
        ref={cartRef}
        dir={direction}
        className={`fixed top-0 ${cartPositionClass} h-full w-full md:w-[400px] lg:w-[450px] bg-white shadow-lg p-4 z-50 ${cartTransformClass} flex flex-col`}>
        {/* Header */}
        <div
          className={`flex justify-between items-center pb-2 mb-4 ${headerClass}`}>
          <h2 className="text-lg font-semibold text-[20px] md:text-[25px]">
            Your Order
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items Container - Made scrollable */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li
                  key={item.name}
                  className={`flex justify-between items-center rounded-lg bg-[#fbfbfa] py-5 px-2 border-b border-b-gray-300 ${itemLayoutClass}`}>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productImg}
                      width={70}
                      alt={item.name}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="text-[16px]">{item.name}</p>
                      <p className="text-red-500 font-extrabold text-[14px]">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className={`flex flex-col gap-2 ${controlsClass}`}>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-4 text-[18px]">
                      <button
                        className="px-2 py-1 shadow-sm bg-white text-black rounded"
                        onClick={() => handleRemoveFromCart(item)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-[#54bca2] text-white rounded"
                        onClick={() => handleAddToCart(item)}>
                        +
                      </button>
                      {/* Delete button */}
                      <button
                        className="px-2 py-2 bg-red-500 hover:bg-red-400 text-white rounded transition-colors"
                        onClick={() => handleDeleteFromCart(item)}
                        title="Remove item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 py-6">
          <div className={`flex justify-between items-center ${totalClass}`}>
            <p className="text-lg md:text-[20px]">Total:</p>
            <p className="text-lg md:text-[23px] text-red-500 font-bold">
              ${total.toFixed(2)}
            </p>
          </div>
          <button
            className="w-full mt-5 bg-[#f76d22] text-white py-3 rounded hover:bg-[#e65c1a] transition-colors"
            onClick={handleCheckout} // Updated to use handleCheckout function
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        total={total}
      />
      <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem aliquam ea odio, expedita sapiente deleniti assumenda delectus, illo blanditiis voluptates explicabo magnam laborum in voluptatum magni, optio iusto ipsum non.</div>
    </>
  );
};

export default Cart;
