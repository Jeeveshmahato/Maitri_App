import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../Utiles/Constants";
import { addLoginUser } from "../Utiles/userAuthSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginedUser = useSelector(
    (store) => store?.loginUser?.loginDetails?.firstName
  );
  const getUser = async () => {
    try {
      const res = await axios.get(BaseUrl + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addLoginUser(res.data));
    } catch (error) {
      if (error) {
        navigate("/login");
      }
      
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (!loginedUser) {
      getUser();
    }
  }, []);
  
  // useEffect(() => {
  //   if (!loginedUser) {
  //     navigate("/login");
  //   }
  // }, [loginedUser, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
