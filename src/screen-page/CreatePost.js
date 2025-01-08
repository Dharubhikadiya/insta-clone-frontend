import React, { useState, useEffect, useContext } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/Logincontext";
import { AiOutlinePlus } from "react-icons/ai";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const { setmodalOpen } = useContext(LoginContext);

  const navigate = useNavigate();

  const notifyA = (message) => toast.error(message);
  const notifyB = (message) => toast.success(message);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "companycloude");
    fetch("https://api.cloudinary.com/v1_1/companycloude/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => setUrl(data.url))
      .catch((error) => console.log(error));

    // saving image in mongodb
  };

  const loadfile = (event) => {
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    if (url) {
      fetch(`${process.env.REACT_APP_BASE_API}/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("successfully posted", data.message);
            navigate("/");
            setBody("");
            setUrl("");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [url, body, navigate]);

  return (
    <div
      className="
    flex justify-center m-4"
    >
      <div className="w-full max-w-md bg-white border border-gray-400 p-2">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-center mx-auto text-2xl font-medium">
            Create New Post
          </h1>
          <span
            onClick={() => {
              postDetails();
            }}
            className="font-semibold text-blue-600 cursor-pointer"
          >
            Share
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-8 border-b">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setImage(event.target.files[0]);
            }}
          />
          <img
            alt=""
            id="output"
            src="https://static.thenounproject.com/png/11204-200.png"
            className="mt-4 object-cover overflow-hidden w-[250px] h-[250px] pt-4"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
              alt="Profile"
              className="w-[40px] h-[40px] object-cover overflow-hidden rounded-full"
            />
            <span className="font-semibold">Ramesh</span>
          </div>
        </div>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a caption..."
            className="border p-4 w-full mx-auto"
          />
        </div>
        <nav className="z-10 sticky bottom-0  flex justify-between p-4 bg-white border-t border-gray-200">
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
  );
};

export default CreatePost;
