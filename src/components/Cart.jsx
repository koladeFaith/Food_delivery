import { X } from "lucide-react";

const Cart = ({ cart, isOpen, onClose, addToCart, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-lg p-4 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Items */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.name}
              className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeFromCart(item)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="mt-6 border-t pt-4">
        <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
