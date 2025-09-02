import React from "react";
import login from "../images/login.svg";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
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
        .min(6, "Paswword must be 6 characters or more"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://food-delivery-backend-n6at.onrender.com/user/signin",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success(response.data.message);
        console.log(response.data.message);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.error("Error: " + error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          console.error("An unexpected error occurred: " + error.message);
          toast.error(error.message);
        }
      }
    },
  });
  console.log(formik.touched);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {" "}
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
        </div>{" "}
        <div className="flex flex-col mb-3 gap-1">
          <label htmlFor="" className="text-[14px]">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
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
        <div className="bg-[#f66c21] rounded-lg py-2 w-full flex gap-2 justify-center items-center">
          {" "}
          <img src={login} className="text-white" width={17} alt="" />
          <button className=" text-white text-[14px]" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Signin;
