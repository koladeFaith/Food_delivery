import React, { useEffect, useRef } from "react";
import { useUser } from "../contexts/useUser";
import { useCart } from "./useCart";
import { X } from "lucide-react";

const UserProfile = ({ onClose }) => {
  const { user, logout } = useUser();
  const { cart } = useCart();
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!user) return null;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Blur overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Profile modal */}
      <div
        ref={modalRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 w-80 md:w-96 animate-scale-in">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Profile</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User info */}
        <div className="mb-5">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="ml-3">
              <p className="font-semibold text-gray-800">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Cart summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Cart Summary</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Items:</span>
              <span className="font-semibold text-orange-500">
                {totalItems}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{totalItems}</p>
              <p className="text-xs text-blue-500">Items</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-green-500">Total</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105">
            Logout
          </button>

          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>

      {/* Add some custom styles for the animation */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default UserProfile;
