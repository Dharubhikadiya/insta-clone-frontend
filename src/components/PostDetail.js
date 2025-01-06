import React from "react";
import { LuMessageCircle } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { FaSmile } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostDetail = ({ items, toggleDetails }) => {
  const navigate = useNavigate();

  const notifyB = (message) => toast.success(message);

  const removepost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:5000/deletepost/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          notifyB(result.message);
          toggleDetails();
          navigate("/");
        });
    }
  };

  return (
    <div>
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
                onClick={() => removepost(items._id)}
                type="button"
                className="text-lg bg-gray-200 p-2 rounded-md ms-4 text-red-500"
              >
                <RiDeleteBin6Fill />
              </button>
              <button
                type="button"
                onClick={() => toggleDetails()}
                className="text-lg bg-gray-200 p-2 rounded-md ms-2"
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
              <div className="flex gap-2 px-4 justify-between">
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
              <div className="flex items-center gap-2 px-4 pb-3">
                <div className="flex-1 flex items-center gap-2 border rounded-full px-3 py-1.5">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 text-sm border-none focus:outline-none"
                  />
                  <button>
                    <FaSmile className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <button>
                  <LuMessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
