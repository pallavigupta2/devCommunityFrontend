import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const loggedInUser = useSelector((store) => store.user);
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
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
