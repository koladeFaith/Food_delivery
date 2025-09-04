import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/useUser";

const Signin = ({ onSuccess }) => {
  // Add onSuccess prop
  const navigate = useNavigate();
  const { login } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Address is required")
        .email("Invalid Email"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be 6 characters or more"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await login(values.email, values.password);
        console.log("Login result:", result);

        if (result.success) {
          toast.success("Login successful!");
          resetForm();

          // Call onSuccess callback if provided (to close modal)
          if (onSuccess) {
            onSuccess();
          }

          // Navigate to home
          navigate("/");
        } else {
          toast.error(result.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An unexpected error occurred");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-3 mt-4 gap-1">
          <label htmlFor="" className="text-[14px]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-2 px-2 focus:outline-none focus:border-[#fd6513]"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col mb-3 gap-1">
          <label htmlFor="" className="text-[14px]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-2 px-2 focus:outline-none focus:border-[#fd6513]"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <button
          className="bg-[#f66c21] rounded-lg py-2 w-full flex gap-2 justify-center items-center cursor-pointer"
          type="submit">
          {/* Replace with your icon or remove if not available */}
          <span className="text-white">→</span>
          <span className="text-white text-[14px]">Login</span>
        </button>
      </form>
    </>
  );
};

export default Signin;
