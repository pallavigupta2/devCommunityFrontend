import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const MyConnections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      const connectionsData = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setLoading(false);
      setConnections(connectionsData?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (loading)
    return <h1 className="h-150 text-center text-3xl p-2">Loading...</h1>;
  if (connections.length === 0)
    return (
      <h1 className="h-150 text-center text-3xl p-2">No Connections Found</h1>
    );

  return (
    <div className="h-150 text-center my-10">
      <h1 className="text-3xl p-2">My Connections</h1>
      {connections?.map((connection) => {
        return (
          <div className="bg-neutral rounded-lg shadow-amber-50 flex w-3xl m-4 p-4 mx-auto">
            <div>
              <img
                src={connection.photoUrl}
                alt="Connection Photo"
                className="w-30 h-30 rounded-full"
              />
            </div>
            <div className="text-left mx-4 text-white">
              <h2 className="font-bold text-xl">
                {connection.firstName + " " + connection.lastName}
              </h2>
              {connection.age && connection.gender && (
                <h4>{connection.age + " " + connection.gender}</h4>
              )}
              {connection?.skills && <p>{connection?.skills?.join(", ")}</p>}
              {connection.aboutUs && <p>{connection.aboutUs}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyConnections;
