import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedInUserData } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const loggedInUser=useSelector(store=>store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addLoggedInUserData(user.data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return !loggedInUser && (
    <div className="flex justify-center my-30">
      <div className="card bg-neutral text-primary-content w-96 shadow-3xl justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <fieldset className="fieldset text-white text-xs">
            <legend className="fieldset-legend text-white">Email</legend>
            <input
              type="text"
              className="input text-neutral"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset text-white text-xs">
            <legend className="fieldset-legend text-white">Password</legend>
            <input
              type="text"
              className="input text-neutral"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
