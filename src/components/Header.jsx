import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { logoutUser } from "../store/userSlice";

const Header = () => {
  const loggedInUser = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout=async()=>{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      dispatch(logoutUser())
      navigate("/login")
  }
  return (
    <div className="navbar bg-neutral shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-white text-xl hover:text-neutral">
          💻 devCommunity
        </Link>
      </div>
      {loggedInUser && (
        <div className="flex gap-2">
          <div className="text-white flex items-center">Welcome {loggedInUser.firstName}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={loggedInUser.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  
                </Link>
              </li>
              <li>
                <Link to="/connections">My Connections</Link>
              </li>
              <li>
                <Link to="/request">Friend Request</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
