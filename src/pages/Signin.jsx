import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/useUser";

const Signin = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);

const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
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
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        "Password contains invalid characters"
      ),
  }),
  onSubmit: async (values, { resetForm }) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        toast.success("Login successful!");
        resetForm();

        if (onSuccess) {
          onSuccess();
        }

        navigate("/");
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <button
          className="bg-[#f66c21] rounded-lg py-2 w-full flex gap-2 justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}>
          <span className="text-white">→</span>
          <span className="text-white text-[14px]">
            {isLoading ? "Logging in..." : "Login"}
          </span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
      </form>
    </>
  );
};

export default Signin;
