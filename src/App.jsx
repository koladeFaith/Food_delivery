
import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Dashboard from "./pages/Auth";
import { Toaster } from "sonner";
import Cart from "./components/Cart";
import CartPersistence from "./components/CartPersistence.jsx";
import AdminAddProduct from "./components/AdminAddProduct.jsx";
import Auth from "./pages/Auth";

const App = () => {
  CartPersistence();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product" element={<Products />} />{" "} */}
        {/* <Route path="/signup" element={<Signup />} />{" "} */}
        {/* <Route path="/login" element={<Signin />} />{" "} */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/admin/add-product" element={<AdminAddProduct/>} />
      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
};

export default App;
