import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionSlice } from "../Utiles/connectionFeed";
import { BaseUrl } from "../Utiles/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const myConnections = async () => {
    try {
      const res = await axios.get(BaseUrl + "/userrequest/accepted", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnectionSlice(res.data));
    } catch (error) {
      console.error("Error getting feed:", error.data);
    }
  };
  useEffect(() => {
    myConnections();
  }, []);
  const connectionUsers = useSelector(
    (store) => store?.connectionFeed?.connectionSlice
  );
  const loginuser = useSelector((store) => store?.userAuth?.loginDetails);
  if (!connectionUsers)
    return (
      <>
        <p className=" text-center">No users</p>
      </>
    );
  return (
    <>
      <div className="flex gap-3 flex-wrap items-center justify-center">
        {connectionUsers &&
          connectionUsers.map((res) => {
            const { _id, firstName, lastName, img_Url, skills } = res;
            return (
              <div key={res._id} className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img src={img_Url} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <div className=" flex gap-3 flex-wrap">
                    {skills &&
                      skills.map((skill) => (
                        <span key={skill} className="badge h-fit w-fit badge-primary">
                          {skill}
                        </span>
                      ))}
                  </div>
                  {loginuser.isPremium && (
                    <Link to={"/chat/" + _id}>
                      <button className="btn btn-primary text-white border-[#4eaa0c]">
                        <svg
                          aria-label="WeChat logo"
                          width="16"
                          height="16"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <g fill="white">
                            <path d="M11.606,3.068C5.031,3.068,0,7.529,0,12.393s4.344,7.681,4.344,7.681l-.706,2.676c-.093,.353,.284,.644,.602,.464l3.173-1.798c1.403,.447,4.381,.59,4.671,.603-.208-.721-.311-1.432-.311-2.095,0-3.754,3.268-9.04,10.532-9.04,.165,0,.331,.004,.496,.011-.965-4.627-5.769-7.827-11.195-7.827Zm-4.327,7.748c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Zm8.386,0c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Z"></path>
                            <path d="M32,19.336c0-4.26-4.998-7.379-9.694-7.379-6.642,0-9.459,4.797-9.459,7.966s2.818,7.966,9.459,7.966c1.469,0,2.762-.211,3.886-.584l2.498,1.585c.197,.125,.447-.052,.394-.279l-.567-2.46c2.36-1.643,3.483-4.234,3.483-6.815Zm-12.73-.81c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275c0,.705-.571,1.275-1.275,1.275Zm6.373,0c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275-.571,1.275-1.275,1.275Z"></path>
                          </g>
                        </svg>
                        Chat
                      </button>
                    </Link>
                  )}
                  {/* <p>
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts
                  </p> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Connections;
