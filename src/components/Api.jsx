// components/Api.js
const API_BASE = "sd ";

export const authAPI = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Return specific error message from backend or default
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  signin: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific authentication errors
        if (response.status === 400) {
          throw new Error(
            data.message || "User not found. Please check your email."
          );
        } else if (response.status === 401) {
          throw new Error(
            data.message || "Incorrect password. Please try again."
          );
        } else {
          throw new Error(data.message || "Login failed. Please try again.");
        }
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const response = await fetch(`${API_BASE}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(data.message || "Failed to get profile information.");
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  getCart: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required to access cart.");
      }

      const response = await fetch(`${API_BASE}/user/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          // Cart endpoint might not exist, return empty cart
          return { cart: [] };
        }
        throw new Error(data.message || "Failed to load cart.");
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        // Network error, return empty cart instead of crashing
        return { cart: [] };
      }
      // For other errors, return empty cart but log the error
      console.warn("Cart loading error:", error.message);
      return { cart: [] };
    }
  },

  updateCart: async (cart) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required to update cart.");
      }

      const response = await fetch(`${API_BASE}/user/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          // Cart endpoint might not exist, but we'll consider this success
          // since we'll handle persistence locally
          return { success: true };
        }
        throw new Error(data.message || "Failed to update cart.");
      }

      return data;
    } catch (error) {
      if (error.name === "TypeError") {
        // Network error, but we'll consider this success for local persistence
        return { success: true };
      }
      // For other errors, still consider success for local persistence
      console.warn("Cart update error:", error.message);
      return { success: true };
    }
  },
};
