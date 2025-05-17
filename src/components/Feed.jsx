import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../store/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const loggedInUser = useSelector((store) => store.user);
  const [error, setError] = useState("");
  const feed = useSelector(store=>store.feed)
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };
  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    loggedInUser && feed && (
      <div className="flex justify-center my-10">
        {
            error && <p className="text-red-600">{error}</p>
        }
        <UserCard user={feed[5]}/>
      </div>
    )
  );
};

export default Feed;
