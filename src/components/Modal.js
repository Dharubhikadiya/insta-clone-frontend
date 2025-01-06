import React from "react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Modal = ({ setmodalOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop for the blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setmodalOpen(false)}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <CgClose className="text-lg" />
          </button>

          {/* Modal content */}
          <div className="p-4 text-center shadow-md">
            <h2 className="text-2xl mb-4 font-semibold">Confirm</h2>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to log out?
            </h3>
            <button
              onClick={() => {
                setmodalOpen(false);
                localStorage.clear();
                navigate("/signin");
              }}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-6 py-2.5 text-center"
            >
              Log Out
            </button>
            <button
              onClick={() => setmodalOpen(false)}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
