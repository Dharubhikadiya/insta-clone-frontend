import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { toast } from "react-toastify";
import { LoginContext } from "../context/Logincontext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserLogin } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (message) => toast.error(message);
  const notifyB = (message) => toast.success(message);

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format

    if (!email || !emailRegex.test(email)) {
      notifyA("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      notifyA("Please enter a password.");
      return false;
    }

    return true;
  };

  const handlesubmit = () => {
    if (!validateFields()) {
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed in Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md border-2 border-gray p-8 bg-white rounded-lg">
        <img
          alt="Your Company"
          src={logo}
          className="mx-auto h-[110px] w-auto"
        />

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-lg/6 font-medium text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0095f6] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link className="font-semibold text-[#0095f6]">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0095f6] sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => handlesubmit()}
                type="button"
                className="my-8 flex w-full justify-center rounded-md bg-[#0095f6] px-3 py-2 text-lg/6 font-semibold text-white shadow-sm hover:bg-[#4cb5f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0095f6]"
              >
                Sign in
              </button>
            </div>

            <p className="text-center text-md text-black">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#0095f6] font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
