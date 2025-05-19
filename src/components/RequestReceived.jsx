import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";

const RequestReceived = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const requestRecevied = useSelector((store) => store.request);
  const fetchPendingRequest = async () => {
    try {
      const request = await axios.get(
        BASE_URL + "/user/received/pendingrequest",
        { withCredentials: true }
      );
      dispatch(addRequest(request?.data?.data));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const reviewRequest = async(status,id)=>{
    try{
         await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
        dispatch(removeRequest(id))
    }catch(err){
        console.error(err)
    }
  }
  useEffect(() => {
    fetchPendingRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!requestRecevied) return;
  if (loading)
    return <h1 className="h-150 text-center text-3xl p-2">Loading...</h1>;
  if (requestRecevied.length === 0)
    return <h1 className="h-150 text-center text-3xl p-2">No Request Found</h1>;

  return (
    <div className="h-150 text-center my-10">
      <h1 className="text-3xl p-2">My Friend Request</h1>
      {requestRecevied?.map((request) => {
        const {
          _id,
          photoUrl,
          aboutUs,
          firstName,
          gender,
          age,
          lastName,
          skills,
        } = request.fromUserId;
        return (
          <div
            id={_id}
            className="bg-neutral rounded-lg shadow-amber-50 flex w-[40%] m-4 p-4 mx-auto justify-between items-center"
          >
            <div>
              <img
                src={photoUrl}
                alt="Connection Photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4 text-white">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <h4>{age + " " + gender}</h4>}
              {skills && <p>{skills?.join(", ")}</p>}
              {aboutUs && <p>{aboutUs}</p>}
            </div>
            <div>
              <button className="btn btn-outline btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>
                Accept
              </button>
              <button className="btn btn-outline btn-accent mx-2" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestReceived;
