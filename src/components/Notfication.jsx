// NotificationDropdown.jsx
import React, { useState } from "react";

const NotificationDropdown = ({ isOpen, toggleDropdown }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
    // Add more notifications as needed
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute right-0 top-12 bg-white w-48 border border-gray-300 p-2 rounded shadow-md`}
    >
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          id="notification-button"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {/* You can replace this with your notification icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
            />
          </svg>
        </button>

        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="notification-button"
        >
          <div className="py-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                {notification.message}
              </div>
            ))}
          </div>

          {notifications.length > 0 && (
            <div
              className="bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer"
              onClick={clearAllNotifications}
            >
              Clear All
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
