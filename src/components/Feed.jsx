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
  if(!feed) return;
  if(feed.length === 0) return <h1 className="h-150 text-center text-3xl p-2">No New Users Found.</h1>
  return (
    loggedInUser && feed && (
      <div className="my-10 flex justify-center">
        {
            error && <p className="text-red-600">{error}</p>
        }
        <UserCard user={feed[0]}/>
        
      </div>
    )
  );
};

export default Feed;
