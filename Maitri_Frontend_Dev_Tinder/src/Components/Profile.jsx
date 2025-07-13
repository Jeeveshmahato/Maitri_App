import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.userAuth?.loginDetails);
  return (
    user && (
      <>
        <EditProfile user={user} />
      </>
    )
  );
};

export default Profile;
