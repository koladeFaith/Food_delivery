import { useEffect } from "react";
import { useUser } from "../contexts/useUser";
import { useCart } from "./useCart";

const CartPersistence = () => {
  const { user } = useUser();
  const { cart, setCart } = useCart();

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      // Load cart from user data
      setCart(user.cart || []);
    } else {
      // Guest users get empty cart that won't be saved
      setCart([]);
    }
  }, [user, setCart]);
  // Save cart when it changes (only for logged-in users)
  useEffect(() => {
    if (user && cart.length >= 0) {
      // Save even empty arrays
      // Update user object with current cart
      const updatedUser = { ...user, cart };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Also save to user-specific backup storage
      localStorage.setItem(`user_cart_${user.id}`, JSON.stringify(cart));
    }

    // DON'T save anything for guest users
  }, [cart, user]);

  // Clear any existing guest cart data
  useEffect(() => {
    localStorage.removeItem("guest_cart");
    localStorage.removeItem("guestCart");
  }, []);

  return null;
};

export default CartPersistence;
