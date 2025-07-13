import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../Utiles/Constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed } from "../Utiles/userFeed";

const FeedProfile = () => {
  const dispatch = useDispatch();
  const feedUsers = useSelector((store) => store?.userFeed?.userFeed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BaseUrl + "/feed", {
        withCredentials: true,
      });
      // console.log("Feed fetched successfully:", res.data);
      dispatch(addUserFeed(res.data));
    } catch (error) {
      console.error("Error getting feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <div className=" flex  items-center justify-center gap-5 my-3">
        {feedUsers?.length > 0 ? (
          <UserCard  users={feedUsers[0]} showButton={true} />
        ) : (
          <p>Loading or no users available</p>
        )}
      </div>
    </>
  );
};

export default FeedProfile;
