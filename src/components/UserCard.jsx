import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    aboutUs = "",
    firstName,
    lastName,
    photoUrl,
    skills,
    age,
    gender,
  } = user;
  const dispatch = useDispatch()
  const handleReviewUsers = async (status, id) => {
    try {
       await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id))
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-neutral w-96 shadow-lg">
      <figure className="px-2 pt-3">
        <img src={photoUrl} alt="user photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center text-base-100">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && <span>Gender : {gender}</span>}
        {age && <span>Age : {age}</span>}
        {skills?.length > 0 && <p>Skills : {skills.toString()}</p>}
        {aboutUs && <p>{aboutUs}</p>}
        <div className="card-actions">
          <button className="btn btn-primary bg-base-100 text-pink-800 hover:bg-pink-200" onClick={() => handleReviewUsers("ignored", _id)}>
            Ignore
          </button>
          <button
            className="btn btn-primary bg-base-100 text-pink-800  hover:bg-pink-200"
            onClick={() => handleReviewUsers("intrested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
