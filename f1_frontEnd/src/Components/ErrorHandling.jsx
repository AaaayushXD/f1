import { ToastContainer, toast } from "react-toastify";
import React from "react";

const ErrorHandling = (props) => {
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  if (props.action === "success") {
    toast.success(props.message, toastStyle);
  } else if (props.action === "error") {
    toast.error(props.message, toastStyle);
  }
  return (
    <div className="w-full h-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ErrorHandling;
