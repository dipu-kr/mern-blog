import React, { useState, useEffect } from "react";
import Oauth from "../components/Oauth";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../constant/baseUrl";
import { FaSpinner } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  // const [loading, setLoading] = useState(false);
  const {
    currentUser,
    loading,
    error: errorMessage,
  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === "") {
      const errMsg = dispatch(signInFailure("Email is required!"));
      toast.error(errorMessage);
    } else if (
      !formData.email.includes("@") ||
      !formData.email.includes(".com")
    ) {
      const errMsg = dispatch(signInFailure("Please Enter Valid Email!"));
      toast.error(errMsg?.payload);
    } else if (formData.password.trim() === "") {
      const errMsg = dispatch(signInFailure("Password is required!"));
      toast.error(errMsg?.payload);
    } else {
      try {
        dispatch(signInStart());
        const req = {
          email: formData.email,
          password: formData.password,
        };

        const response = await axiosInstance.post("/signin", req);

        if (response.data?.status === 200) {
          dispatch(signInSuccess(response?.data?.data));
          navigate("/");
        }
      } catch (error) {
        if (error.response.data?.status === 400) {
          const errMsg = dispatch(signInFailure(error.response.data?.message));
          toast.error(errMsg.payload);
        } else {
          const errMsg = dispatch(signInFailure(error.response.data?.message));
          toast.error(errMsg);
        }
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
            This is a demo project. You can sign in with your email and password
            or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              {loading ? (
                <FaSpinner size={18} className="animate-spin mr-2" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
