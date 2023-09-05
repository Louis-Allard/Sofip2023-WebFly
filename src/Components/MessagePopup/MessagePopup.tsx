import { useEffect } from "react";

const MessagePopup = ({ message, onClose, color = "green" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 30000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const className = `fixed top-1 left-0 right-0 p-4 text-center bg-${color}-600 text-white`;
  return (
    <div className={className}>
      <div className="flex justify-between">
        <div>{message}</div>
        <button
          className="ml-4 text-white hover:text-gray-200"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.646 2.646a.5.5 0 01.708 0L10 9.293l6.646-6.647a.5.5 0 11.708.708L10.707 10l6.647 6.646a.5.5 0 01-.708.708L10 10.707l-6.646 6.647a.5.5 0 01-.708-.708L9.293 10 2.646 3.354a.5.5 0 010-.708z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
