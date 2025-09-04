// contexts/UserContext.js
import React, { useState, useEffect } from "react";
import { authAPI } from "../components/Api";

import { UserContext } from "../contexts/UserContext.js";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get user-specific storage key
  const getUserCartKey = (userId) => {
    return `user_cart_${userId}`;
  };

  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.signin({ email, password });

      // Clear any guest cart data before login
      localStorage.removeItem("guest_cart");
      localStorage.removeItem("guestCart");

      localStorage.setItem("token", response.token);

      // Get user-specific cart from storage
      const userCartKey = getUserCartKey(response.user.id);
      const savedCart = localStorage.getItem(userCartKey);
      const userCart = savedCart
        ? JSON.parse(savedCart)
        : response.user.cart || [];

      // Make sure user object has cart field
      const userWithCart = {
        ...response.user,
        cart: userCart,
      };

      localStorage.setItem("user", JSON.stringify(userWithCart));
      setUser(userWithCart);

      return { success: true, user: userWithCart };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await authAPI.signup({ fullName, email, password });

      // Ensure new user has empty cart
      const userData = {
        ...response.data.user,
        cart: [],
      };

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    if (user) {
      // Save current cart to user-specific storage before logout
      const userCartKey = getUserCartKey(user.id);
      localStorage.setItem(userCartKey, JSON.stringify(user.cart || []));
    }

    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const saveCartToDB = async (cart) => {
    if (!user) return;

    try {
      // Try to save to backend
      await authAPI.updateCart(cart);

      // Update local user data with new cart
      const updatedUser = { ...user, cart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Also save to user-specific storage
      const userCartKey = getUserCartKey(user.id);
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    } catch (error) {
      // If backend fails, save to user-specific storage only
      console.log(error);
      const updatedUser = { ...user, cart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      const userCartKey = getUserCartKey(user.id);
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    }
  };

  const loadCartFromDB = async () => {
    if (!user) return null;

    try {
      const response = await authAPI.getCart();
      return response.cart || [];
    } catch (error) {
      console.log(error);
      // If backend fails, try to load from user-specific storage
      const userCartKey = getUserCartKey(user.id);
      const savedCart = localStorage.getItem(userCartKey);
      return savedCart ? JSON.parse(savedCart) : user.cart || [];
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        saveCartToDB,
        loadCartFromDB,
        getUserCartKey,
      }}>
      {children}
    </UserContext.Provider>
  );
};
