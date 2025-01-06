import React, { useState, useEffect, useRef } from "react";

const ProfilePic = ({ changeprofile }) => {
  const hiddenfileinput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleclick = () => {
    hiddenfileinput.current.click();
  };

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
  };

  const postpic = () => {
    fetch("http://localhost:5000/uploadprofilepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeprofile();
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postpic();
    }
  }, [url]);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative  w-full max-w-lg bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="text-center">
            <h3 className="text-xl font-semibold border-b p-6">
              Change Profile Photo
            </h3>
            <h3
              onClick={handleclick}
              className="text-blue-400 text-md font-semibold border-b p-3 cursor-pointer"
            >
              Upload Photo
            </h3>
            <input
              ref={hiddenfileinput}
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <h3
              onClick={() => {
                setUrl(null);
                postpic();
              }}
              className="text-red-500 text-md font-semibold border-b p-3 cursor-pointer"
            >
              Remove Current Photo
            </h3>
            <h3
              className="text-md font-normal p-3 cursor-pointer"
              onClick={changeprofile}
            >
              Cancel
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
