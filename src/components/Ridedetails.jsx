import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useBookrideMutation } from "../store/Registerapisilice";

const Ridedetails = () => {
  const navigate = useNavigate();
  const { rideId } = useParams();
  const [ridedetails, setridedetails] = useState();
  const token = localStorage.getItem("access_token");
  const count = useSelector((state) => state.searchcount.count);
  const [bookride] = useBookrideMutation();
  console.log("count", count);
  const handleButtonClick = async () => {
    if (token) {
      try {
        const response = await bookride({
          rideId: rideId,
          token: token,
          count: count,
        });
        console.log("Mutation response:", response);
        navigate("/status");
      } catch (error) {
        console.error(" Error in mutation:", error);

        console.error("Complete error object:", error);
      }
    } else {
      navigate("Loggedin");
      console.log("No token cannot book ride");
    }
  };
  useEffect(() => {
    const fetchSelectedRide = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/publish/selectedride/${rideId}`
        );
        const data = await response.json();
        setridedetails(data);
        console.log("here printing new data", data);
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };

    fetchSelectedRide();
  }, []);

  if (ridedetails) {
    const {
      date,
      time_detail: { formatted_time },
      source,
      destination,
      fare,
      user_details: { first_name },
      passengers,
    } = ridedetails;

    return (
      <div className="flex flex-col items-center mt-20">
        <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
          <div className="flex justify-center items-center h-16">
            <h1 className="text-2xl font-bold text-black">{date}</h1>
          </div>
          <div className="px-6 py-4">
            <p>Time: {formatted_time}</p>
            <p className="text-gray-700 text-base">{source}</p>
            <div className="h-2 w-2 rounded-full bg-gray-700"></div>
            <div className="border-l border-gray-700 h-8 mr-2"></div>
            <div className="h-2 w-2 rounded-full bg-gray-700"></div>
            <p className="text-gray-700 text-base">{destination}</p>
          </div>
          <div className="border-t border-gray-900 h-3"></div>

          <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total price for 1 passenger
              </p>
              <p className="text-lg font-semibold text-gray-700">{fare}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-lg font-semibold">Available Seats</p>
              <p className="text-lg font-semibold text-gray-700">
                {passengers}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-900 h-3"></div>

          <div className="flex items-center mt-2">
            <p className="text-lg font-semibold mr-2">Name of the driver:</p>
            <p className="text-gray-700 text-base">{first_name}</p>
          </div>

          <div className="border-t border-gray-900 h-3"></div>

          <div className="flex mt-2 justify-center">
            <button
              className="bg-blue-500 text-white rounded-full p-2 mt-2 w-1/2"
              onClick={handleButtonClick}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Ridedetails;
