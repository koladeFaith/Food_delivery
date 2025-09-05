import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/useUser";

const Signup = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { register } = useUser();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

const formik = useFormik({
  initialValues: {
    fullName: "",
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    fullName: Yup.string()
      .required("Full Name is required")
      .matches(
        /^[a-zA-Z\s]{2,50}$/,
        "Full Name must be 2-50 characters and contain only letters and spaces"
      ),
    email: Yup.string()
      .required("Email Address is required")
      .email("Invalid Email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .max(20, "Password must not exceed 20 characters"),
  }),
  onSubmit: async (values, { resetForm }) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await register(
        values.fullName,
        values.email,
        values.password
      );

      if (result.success) {
        toast.success("Account created successfully!");
        resetForm();

        if (onSuccess) {
          onSuccess();
        }

        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  },
});

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-3 gap-1">
          <label htmlFor="" className="text-[14px]">
            Full Name
          </label>
          <input
            type="text"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-1 px-2 focus:outline-none focus:border-[#fd6513]"
            placeholder="Enter your full name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading} 
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-500 text-[12px]">{formik.errors.fullName}</p>
          )}
        </div>
        <div className="flex flex-col mb-3 gap-1">
          <label htmlFor="" className="text-[14px]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-1 px-2 focus:outline-none focus:border-[#fd6513]"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading} 
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-[12px]">{formik.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col mb-3 gap-1">
          <label htmlFor="" className="text-[14px]">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="border border-[#e9e8e7] rounded-lg w-full text-[13px] py-1 px-2 focus:outline-none focus:border-[#fd6513]"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading} 
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-[12px]">{formik.errors.password}</p>
          )}
        </div>
        <button
          className="bg-[#f66c21] rounded-lg py-2 w-full flex gap-2 justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading} 
        >
          <FiUser className="" />
          <span className="text-white">
            {isLoading ? "Creating Account..." : "Sign Up"}
          </span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
      </form>
    </>
  );
};

export default Signup;
