import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);
  return currentUser ? <div>{children}</div> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
