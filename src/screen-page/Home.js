import React, { useEffect, useState, useContext } from "react";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { BsSave } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import { LoginContext } from "../context/Logincontext";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";

const Home = () => {
  var piclink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [commentbox, setCommentbox] = useState(false);
  const [items, setItems] = useState("");
  let limit = 10;
  let skip = 0;

  const { setmodalOpen } = useContext(LoginContext);

  const togglecomment = (posts) => {
    if (commentbox) {
      setCommentbox(false);
    } else {
      setCommentbox(true);
      setItems(posts);
    }
  };

  const likepost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      });
  };

  const unlikepost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const makecomment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        console.log(result);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }
    fetchpost();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  const fetchpost = () => {
    fetch(`http://localhost:5000/allposts?limit=${limit}&skip=${skip}`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setData((data) => [...data, ...result]))
      .catch((err) => console.log(err));
  };

  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      skip = skip + 10;
      fetchpost();
    }
  };

  return (
    <div>
      <div className="flex bg-gray-100 flex-col items-center justify-center p-4 py-2">
        <div className="max-w-[460px] w-full">
          {data?.map((posts) => {
            return (
              <div className="bg-white max-w-[460px] w-full rounded shadow-inner">
                {" "}
                {/* Header */}
                <div
                  key={posts._id}
                  className="flex items-center justify-between p-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Profile Picture */}
                    <Link to={`/userprofile/${posts.postedBy._id}`}>
                      <div className="w-8 h-8 rounded-full overflow-hidden mt-2">
                        <img
                          src={
                            posts.postedBy.photo
                              ? posts.postedBy.photo
                              : piclink
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    {/* Username and Location */}
                    <div>
                      <Link
                        to={`/userprofile/${posts.postedBy._id}`}
                        className="text-sm font-semibold"
                      >
                        {posts.postedBy.name}
                        <div className="text-xs text-gray-500 text-left cursor-pointer">
                          Surat
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/* More Options button */}
                  <button className="p-2 text-2xl">
                    <HiOutlineDotsHorizontal />
                  </button>
                </div>
                {/* Main Image */}
                <div className="relative w-full aspect-[3/2]">
                  <img
                    src={posts.photo}
                    alt="A person wearing a pink blouse and floral saree with braided hairstyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Action buttons */}
                <div className="p-3 my-2">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center justify-center">
                      {/* Like button */}
                      {posts.likes.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      ) ? (
                        <button
                          onClick={() => unlikepost(posts._id)}
                          className="text-2xl text-red-500"
                        >
                          <FaHeart />
                        </button>
                      ) : (
                        <button
                          onClick={() => likepost(posts._id)}
                          className="text-2xl text-dark"
                        >
                          <FaRegHeart />
                        </button>
                      )}

                      {/* Comment button */}
                      <button
                        onClick={() => togglecomment(posts)}
                        className="text-2xl text-dark"
                      >
                        <FaRegComment />
                      </button>
                      {/* Share button */}
                      <button className="text-2xl text-dark">
                        <LuSend />
                      </button>
                    </div>
                    {/* Save button */}
                    <button className="text-xl text-dark">
                      <BsSave />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="mt-3 pe-2">
                    <p className="font-semibold text-sm text-left">
                      {posts.likes.length} Likes
                    </p>
                  </div>

                  {/* Caption */}
                  <div className="mt-1">
                    <p className="text-sm p-0 m-0 text-left">{posts.body}</p>
                  </div>

                  {/* All Comment */}
                  <div className="mt-1">
                    <p
                      onClick={() => togglecomment(posts)}
                      className="text-md font-semibold p-0 m-0 text-left cursor-pointer"
                    >
                      View all comments
                    </p>
                  </div>

                  {/* comment section */}
                  <div className="mt-4 mb-2 relative">
                    <div className="absolute top-1.5 left-2 text-xl">☺️</div>
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add a comment"
                      className="border w-full p-2 rounded-xl ps-12"
                    ></input>
                    <button
                      onClick={() => makecomment(comment, posts._id)}
                      className="absolute right-3 top-2 font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <nav className="z-5 sticky bottom-0  flex justify-between p-4 bg-white border-t border-gray-200">
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
      </div>

      {commentbox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row p-6 gap-8 max-w-[800px] w-full">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src={items.photo}
                alt="Profile"
                className="w-[400px] h-[450px] object-cover rounded-md overflow-hidden"
              />
            </div>

            {/* Comments Section */}
            <div className="flex flex-col w-full md:w-1/2 relative">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold mx-auto">Comments</h2>
                <button
                  type="button"
                  onClick={() => setCommentbox(false)}
                  className="text-lg"
                >
                  <CgClose />
                </button>
              </div>

              {/* Comment List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                <div className="flex gap-3">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-sm text-left flex">
                      {items.postedBy.name}
                    </span>
                    <p className="text-sm">{items.body}</p>
                  </div>
                </div>
                {items.comments.map((comment) => {
                  return (
                    <div>
                      <span className="text-md font-semibold flex">
                        {comment.postedBy.name}
                      </span>
                      <p className="text-sm text-gray-600 flex">
                        {comment.comment}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Emoji Bar and Comment Input */}
              <div className="border-t bg-white fixed bottom-0 left-0 right-0 md:relative">
                <div className="flex gap-2 px-4 justify-between pt-4">
                  <button className="hover:bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">❤️</span>
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">🙌</span>
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">🔥</span>
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">👏</span>
                  </button>
                  <button className="hover:bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">🤣</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
