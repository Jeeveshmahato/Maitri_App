import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../Utiles/Constants";
import { removeLoginUser } from "../Utiles/userAuthSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginedUser = useSelector((store) => store?.userAuth?.loginDetails);
  const handleLogout = async (e) => {
    try {
      await axios.post(
        BaseUrl + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      dispatch(removeLoginUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(!update);
  }, [loginedUser]);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className=" flex gap-2   items-center">
            <img
              className=" h-[40px] w-[40px] rounded-full"
              src={logo}
              alt=""
            />
            <h3 className=" btn-ghost text-xl">Maitri</h3>
          </Link>
          {/* <p className="mt-2">Bond Beyond Boundaries.</p> */}
        </div>
        <div className="flex items-center gap-2">
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    loginedUser?.img_Url ||
                    "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/editProfile" className="justify-between">
                  Edit Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <Link to="/pendingrequests">Pending Requests</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/membership">Membership</Link>
              </li>
              <li>
                <Link onClick={(e) => handleLogout(e)}>Logout</Link>
              </li>
            </ul>
          </div>
          {loginedUser && <p>{loginedUser?.firstName}</p>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
