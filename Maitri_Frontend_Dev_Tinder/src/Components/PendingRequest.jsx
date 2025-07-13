import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../Utiles/Constants";
import {
  addPendingRequests,
  removePendingRequests,
} from "../Utiles/pendingRequestFeed";

const PendingRequest = () => {
  const dispatch = useDispatch();
  const requestes = async () => {
    try {
      const res = await axios.get(BaseUrl + "/userrequest/pending", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addPendingRequests(res.data));
    } catch (error) {
      console.error("Error getting feed:", error);
    }
  };
  useEffect(() => {
    requestes();
  }, []);
  const pendingUsers = useSelector(
    (store) => store?.requestFeed?.pendingRequests
  );
  const modifyconnection = async (status, _id) => {
    try {
      const res = await axios.post(
        BaseUrl + "/connection/modifystatus/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removePendingRequests(_id));
      console.log("clicked removePendingRequests");
    } catch (error) {
      console.error("Error getting feed:", error);
    }
  };
  if (!pendingUsers || pendingUsers.length === 0)
    return (
      <>
        <p className=" text-center">No users</p>
      </>
    );

  return (
    <>
      <div className=" flex flex-wrap gap-3">
        {pendingUsers &&
          pendingUsers.map((res) => {
            const { firstName, lastName, img_Url, skills } = res.fromUserId;
            return (
              <div key={res._id} className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img src={img_Url} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <div className=" flex gap-3">
                    {skills &&
                      skills.map((skill) => (
                        <span key={skill} className="badge badge-primary">
                          {skill}
                        </span>
                      ))}
                  </div>
                  {/* <p>
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts
                  </p> */}
                  <div className="card-actions">
                    <button
                      className="btn bg-red-600"
                      onClick={() => {
                        modifyconnection("rejected", res._id);
                      }}
                    >
                      Ignore
                    </button>
                    <button
                      className="btn bg-pink-700"
                      onClick={() => {
                        modifyconnection("accepted", res._id);
                      }}
                    >
                      Interested
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PendingRequest;
