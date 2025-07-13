import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
// import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import Test from "./Components/Test";
import FeedProfile from "./Components/FeedProfile";
import PendingRequest from "./Components/PendingRequest";
import Connections from "./Components/Connections";
import NotFound from "./Components/NotFound";
import Membership from "./Components/Membership";
import Chat from "./Components/Chat";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<FeedProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editProfile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/pendingrequests" element={<PendingRequest />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/membership" element={<Membership/>}/>
            <Route path="/chat/:userID" element ={<Chat/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
