import { Button, Label, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../constant/baseUrl";
import { FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (formData.username.trim() === "") {
      toast.error("Username is required!");
    } else if (formData.email.trim() === "") {
      toast.error("Email is required!");
    } else if (
      !formData.email.includes("@") ||
      !formData.email.includes(".com")
    ) {
      toast.error("Please Enter Valid Email!");
    } else if (formData.password.trim() === "") {
      toast.error("Password is required!");
    } else {
      setLoading(true);
      try {
        const req = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        const response = await axiosInstance.post("/signup", req);

        if (response.data?.status === 201) {
          setLoading(false);
          toast.success(response.data?.message);
          navigate("/sign-in");
        }
      } catch (error) {
        if (error.response.data?.status === 400) {
          setLoading(false);
          toast.error(error.response.data?.message);
        } else {
          setLoading(false);
          toast.error(error.response.data?.message);
        }
      }
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mern
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="h-[40px]"
            >
              {loading === true ? (
                <FaSpinner size={18} className="animate-spin mr-2" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;
