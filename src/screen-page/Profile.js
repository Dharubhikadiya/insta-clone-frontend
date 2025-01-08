import React, { useEffect, useState, useContext } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { LoginContext } from "../context/Logincontext";
import { LuLogOut } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoGridOutline,
  IoCameraOutline,
  IoNotificationsOutline,
  IoEllipsisVerticalOutline,
  // IoPersonOutline,
} from "react-icons/io5";

import { Link } from "react-router-dom";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";

const Profile = () => {
  var piclink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");

  const { setmodalOpen } = useContext(LoginContext);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_API}/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setPic(result.posts);
        setUser(result.user);
      });
  }, []);

  return (
    <div
      className="
    flex justify-center m-4"
    >
      <div className="w-full max-w-md bg-white border border-gray-400">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-semibold">
              {JSON.parse(localStorage.getItem("user"))?.name}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <IoNotificationsOutline className="h-6 w-6" />
            <IoEllipsisVerticalOutline className="h-6 w-6" />
          </div>
        </header>

        {/* Profile Info */}
        <section className="p-4">
          <div className="flex items-center gap-4  w-full">
            <div className="mt-2">
              <img
                onClick={changeprofile}
                src={user?.photo ? user?.photo : piclink}
                alt="Profile"
                className="w-[100px] h-[100px] object-cover overflow-hidden rounded-full"
              />
            </div>
            <div className="gap-14 flex items-center justify-between text-center ps-6">
              <div>
                <div className="font-semibold">{pic ? pic.length : 0}</div>
                <div className="text-sm text-gray-600">posts</div>
              </div>
              <div>
                <div className="font-semibold">
                  {user?.followers ? user?.followers.length : 0}
                </div>
                <div className="text-sm text-gray-600">followers</div>
              </div>
              <div>
                <div className="font-semibold">
                  {user?.following ? user?.following.length : 0}
                </div>
                <div className="text-sm text-gray-600">following</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              variant="outline"
              className="flex-1 rounded-lg bg-white text-gray-900 p-1 border border-gray-300 hover:bg-gray-100"
            >
              Following
            </button>
            <button
              variant="outline"
              className="flex-1 rounded-lg bg-white text-gray-900 p-1 border border-gray-300 hover:bg-gray-100"
            >
              Message
            </button>
          </div>
        </section>

        {/* Gallery Toggle */}
        <div className="flex justify-center border-b border-gray-200">
          <button className="p-4 border-b-2 border-gray-900">
            <IoGridOutline className="h-6 w-6" />
          </button>
          <button className="p-4">
            <IoCameraOutline className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 bg-gray-100">
          {pic?.map((pic) => (
            <img
              key={pic._id} // Add the unique key here
              onClick={() => toggleDetails(pic)}
              src={pic.photo}
              alt={pic.name}
              className="w-full h-40 object-cover"
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <nav className="sticky bottom-0 left-0 right-0 flex justify-between p-4 bg-white border-t border-gray-200">
          <Link to="/">
            <IoHomeOutline className="h-6 w-6" />
          </Link>
          <IoSearchOutline className="h-6 w-6" />
          <Link to="/createpost">
            <AiOutlinePlus className="h-6 w-6" />
          </Link>
          <LuLogOut className="h-6 w-6" onClick={() => setmodalOpen(true)} />
          <Link to="/profile">
            <FaRegCircleUser className="h-6 w-6" />
          </Link>
        </nav>
      </div>
      {show && <PostDetail items={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
};

export default Profile;
