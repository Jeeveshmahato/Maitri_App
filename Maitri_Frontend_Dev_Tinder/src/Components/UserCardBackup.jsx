import axios from "axios";
import React from "react";
import { BaseUrl } from "../Utiles/Constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../Utiles/userFeed";

const UserCardBackup = ({ users, showButton }) => {
  const dispatch = useDispatch();
  const handlesendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BaseUrl + "/connection/request/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);
  const { _id, firstName, lastName, skills, age, gender, img_Url } = users;
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            className=" w-[400px] h-[500px] object-center object-contain"
            src={img_Url}
            alt="People"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + " " + gender}</p>
          <div className="flex gap-2.5">
            {skills &&
              skills.map((skill) => {
                return <span key={skill}>{skill}</span>;
              })}
          </div>
          {showButton && (
            <div className="card-actions  justify-end">
              <button
                className="btn bg-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  handlesendRequest("ignored", _id);
                }}
              >
                Ignore
              </button>
              <button
                className="btn bg-pink-700"
                onClick={(e) => {
                  e.preventDefault();
                  handlesendRequest("interested", _id);
                }}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCardBackup;
