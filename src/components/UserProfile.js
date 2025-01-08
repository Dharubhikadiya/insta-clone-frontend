import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoAddOutline,
  IoVideocamOutline,
  IoGridOutline,
  IoCameraOutline,
  IoNotificationsOutline,
  IoEllipsisVerticalOutline,
  // IoPersonOutline,
} from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { LoginContext } from "../context/Logincontext";

const UserProfile = () => {
  var piclink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const { setmodalOpen } = useContext(LoginContext);

  const followUser = (userId) => {
    fetch(`${process.env.REACT_APP_BASE_API}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  const unfollowUser = (userId) => {
    fetch(`${process.env.REACT_APP_BASE_API}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_API}/user/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.posts);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow, userid]);

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
              {user.name}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <IoNotificationsOutline className="h-6 w-6" />
            <IoEllipsisVerticalOutline className="h-6 w-6" />
          </div>
        </header>

        {/* Profile Info */}
        <section className="p-4">
          <div className="flex items-center justify-between w-full">
            <div className=" w-1/5 mt-2">
              <img
                src={user.photo ? user.photo : piclink}
                alt="Profile"
                className="w-[80px] h-[80px] object-cover overflow-hidden rounded-full"
              />
            </div>
            <div className="w-4/5 flex items-center justify-between text-center ps-6">
              <div>
                <div className="font-semibold">{posts.length}</div>
                <div className="text-sm text-gray-600">posts</div>
              </div>
              <div>
                <div className="font-semibold">
                  {user.followers ? user.followers.length : 0}
                </div>
                <div className="text-sm text-gray-600">followers</div>
              </div>
              <div>
                <div className="font-semibold">
                  {user.following ? user.following.length : 0}
                </div>
                <div className="text-sm text-gray-600">following</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
              variant="outline"
              className="flex-1 rounded-lg bg-white text-gray-900 p-1 border border-gray-300 hover:bg-gray-100"
            >
              {isFollow ? "Following" : "Follow"}
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

        <div className="grid grid-cols-3 gap-1 bg-gray-100 ">
          {posts?.map((pic) => {
            return (
              <>
                <img
                  //   onClick={() => toggleDetails(pic)}
                  key={pic?._id}
                  src={pic?.photo}
                  className="w-full h-40 object-cover"
                />
              </>
            );
          })}
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
      {/* {show && <PostDetail items={posts} toggleDetails={toggleDetails} />} */}
    </div>
  );
};

export default UserProfile;
