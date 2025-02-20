/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { ImCross, ImCheckmark } from "react-icons/im";

const ToastMessage = ({ message = "", type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const position =
    type === "success" ? "top-45 right-30" : "top-45 right-[45%]";
  const Icon = type === "success" ? ImCheckmark : ImCross;

  return (
    <div className={`fixed ${position} z-50`}>
      <div
        className={`flex items-center space-x-3 ${backgroundColor} text-white px-4 py-2 rounded-lg shadow-lg`}
      >
        <Icon className="text-lg" />
        <p className="text-base">{message}</p>
      </div>
    </div>
  );
};

export default ToastMessage;
