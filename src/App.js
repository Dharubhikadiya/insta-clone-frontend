import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen-page/Home";
import SignUp from "./screen-page/SignUp";
import SignIn from "./screen-page/SignIn";
import Profile from "./screen-page/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./screen-page/CreatePost";
import { LoginContext } from "./context/Logincontext";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./screen-page/MyFollowingPost";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <GoogleOAuthProvider clientId="142283934130-5ffc7quthommea2cl9ei4lfeljbhjkl7.apps.googleusercontent.com">
          <LoginContext.Provider value={{ setUserLogin, setmodalOpen }}>
            <Navbar login={userLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/userprofile/:userid" element={<UserProfile />} />
              <Route path="/myfollowingpost" element={<MyFollowingPost />} />
            </Routes>

            <ToastContainer />
            {modalOpen && <Modal setmodalOpen={setmodalOpen} />}
          </LoginContext.Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
