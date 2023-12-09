import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const sidebarClasses = "w-72 md:w-56 bg-yellow-200 h-screen p-5 pt-8 fixed"; // Use responsive width

  const menuItems = [
    { title: "Requested Ride", icon: "👋", path: "/Ride" },
    { title: "Published Ride", icon: "🚗", path: "/userpublish" },
  ];

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  console.log("here the page highlight", currentPage);
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex">
      <div className={sidebarClasses}>
        <div className="flex gap-x-4 items-center mb-4">
          <div className="cursor-pointer duration-500">🌐</div>
          <h1 className="text-dark-purple font-medium text-xl">Car driven</h1>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-red text-dark-purple text-sm items-center gap-x-4 
              mt-2 ${currentPage === item.path && "bg-white"}`}
              onClick={() => setCurrentPage(item.path)}
            >
              <Link to={item.path}>
                <span>
                  {item.icon} {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
