import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedInUserData } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const loggedInUser = useSelector((store) => store.user);
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
      setError("Error : " + err?.response?.data || "Something went wrong!");
      console.error(err);
    }
  };
  const handleSignUp = async () => {
    try {
      const newUser = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addLoggedInUserData(newUser?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.error(err);
    }
  };
  return (
    !loggedInUser && (
      <div className="flex justify-center my-30">
        <div className="card bg-neutral text-primary-content w-96 shadow-3xl justify-center">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">
              {isLoginForm ? "Login" : "Sing Up"}
            </h2>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset text-white text-xs">
                  <legend className="fieldset-legend text-white">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input text-neutral"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
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
                type="password"
                className="input text-neutral"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {error && <p className="text-red-400">{error}</p>}

            <div className="card-actions justify-center">
              <button
                className="btn"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <div>
              <p
                className="cursor-pointer text-center"
                onClick={() => setIsLoginForm((prev) => !prev)}
              >
                {isLoginForm
                  ? "New User? Sign Up here"
                  : "Existing User? Login here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
