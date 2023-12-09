// Navbar.jsx
import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import NotificationDropdown from "./Notfication";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  let Links = [
    { name: "RIDE", link: "/Ride" },
    {
      name: "NOTIFICATION",
      link: "/",
      onClick: toggleNotificationDropdown,
    },
    { name: "PAYMENT", link: "/" },
    { name: "PROFILE", link: "/profile" },
    { name: "WALLET", link: "/wallet" },
  ];

  const Token = localStorage.getItem("access_token");

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("access_token");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <img
            src="logo/carpoolinglogo.jpg"
            alt="Logo"
            width="80"
            height="auto"
            className="hidden md:block"
          />
          <span>Inscribe</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Token ? (
            <>
              {Links.map((link) => (
                <li
                  key={link.name}
                  className="md:ml-8 md:my-0 my-7 font-semibold"
                >
                  {link.onClick ? (
                    <span className="cursor-pointer" onClick={link.onClick}>
                      {link.name}
                    </span>
                  ) : (
                    <a
                      href={link.link}
                      className="text-gray-800 hover:text-blue-400 duration-500"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <NotificationDropdown
                  isOpen={notificationDropdownOpen}
                  toggleDropdown={toggleNotificationDropdown}
                />
              </li>
              <Link
                to="/Ridepublish"
                className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                Publish Ride
              </Link>
              <button
                onClick={handleLogout}
                className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <a
                  href="/login"
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  Login
                </a>
              </li>
              <li className="md:ml-8 md:my-0 my-7 font-semibold">
                <a
                  href="/register"
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  Signin
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
