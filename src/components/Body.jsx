import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addLoggedInUserData } from "../store/userSlice";

const Body = () => {
  const loggedInUser = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    if(loggedInUser) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addLoggedInUserData(res.data))
    } catch (err) {
      if(err.status === 401)
      {
          navigate("/login")
      }

    }
  };
  useEffect(() => {
    fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-pink-200 flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
