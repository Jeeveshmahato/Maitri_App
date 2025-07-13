import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Utiles/Constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addUserFeed, removeUserFeed } from "../Utiles/userFeed";

const FeedProfile = () => {
  const dispatch = useDispatch();
  const feedUsers = useSelector((store) => store?.userFeed?.userFeed);
  const [bgColor, setBgColor] = useState("bg-base-100");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  console.log("Feed", feedUsers);
  const getFeed = async (pageNumber = 1) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}/feed?page=${pageNumber}`, {
        withCredentials: true,
      });

      if (res.data.length > 0) {
        dispatch(addUserFeed(res.data));
        console.log("Feed fetched successfully:", res.data);
        setPage(pageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error getting feed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = async (userId, direction) => {
    try {
      const status = direction === "right" ? "interested" : "ignored";
      await axios.post(
        `${BaseUrl}/connection/request/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      // Visual feedback
      setBgColor(direction === "right" ? "bg-success/10" : "bg-error/10");
      setTimeout(() => setBgColor("bg-base-100"), 500);

      dispatch(removeUserFeed(userId));

      // Load more profiles if we're running low
      if (feedUsers.length <= 2 && hasMore) {
        getFeed(page);
      }
    } catch (error) {
      console.error("Error handling swipe:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${bgColor}`}
    >
      {feedUsers?.length > 0 ? (
        <div className="w-full max-w-md">
          <UserCard
            user={feedUsers[0]}
            onSwipe={handleSwipe}
            key={feedUsers[0]._id}
          />
          <div className="flex justify-center gap-8 mt-8">
            <button
              className="btn btn-circle btn-outline btn-error btn-lg"
              onClick={() => handleSwipe(feedUsers[0]._id, "left")}
            >
              ✕
            </button>
            <button
              className="btn btn-circle btn-outline btn-success btn-lg"
              onClick={() => handleSwipe(feedUsers[0]._id, "right")}
            >
              ✓
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl">No more profiles to show</p>
          {hasMore ? (
            <button
              className="btn btn-primary mt-4"
              onClick={() => getFeed(page)}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          ) : (
            <p className="mt-4">You've seen all available profiles</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedProfile;
