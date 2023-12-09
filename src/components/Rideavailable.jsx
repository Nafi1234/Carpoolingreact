import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AvailableRide = () => {
  const ridesData = useSelector((state) => state.rides);
  const rides = ridesData.rides;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 2;

  if (!Array.isArray(rides)) {
    return <div>Loading...</div>;
  }

  const handleCardDoubleClick = (ride) => {
    console.log("Ride ID:", ride.id);
    navigate(`/ridedetails/${ride.id}`);
  };

  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = rides.slice(indexOfFirstRide, indexOfLastRide);

  const renderRides = currentRides.map((ride, index) => (
    <div
      key={ride.id}
      className="w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:translate-y-1 mb-4 h-64 relative"
      onDoubleClick={() => handleCardDoubleClick(ride)}
    >
      <div className="px-4 py-4">
        <p>Source: {ride.source}</p>
        <p>Destination: {ride.destination}</p>
        <p>Name:{ride.user_details.first_name}</p>
        <p>No of passenger: {ride.passengers}</p>
        <p>Time:{ride.time_detail.formatted_time}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-2"></div>

      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full">
        <p className="text-xs font-semibold">₹{ride.fare}</p>
      </div>
    </div>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(rides.length / ridesPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <span
      key={number}
      className={`mx-2 cursor-pointer ${
        currentPage === number ? "text-blue-500" : "text-gray-500"
      }`}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </span>
  ));

  return (
    <div className="p-4 mt-20">
      {rides.length > 0 && (
        <h1 className="text-2xl font-semibold mb-4">
          Date: {rides[0].date} - Source: {rides[0].source} - Destination:{" "}
          {rides[0].destination}
        </h1>
      )}

      <div className="flex flex-col items-center">{renderRides}</div>

      <div className="flex justify-center mt-4">{renderPageNumbers}</div>
    </div>
  );
};

export default AvailableRide;
