import React, { useState } from "react";
import { selectKilometer } from "../store/KilometerSlice";
import { useSelector } from "react-redux";
import { selectpassenger } from "../store/PassengerSlice";
import { selectPrice } from "../store/Priceslice";
import { selectdate } from "../store/DateSlice";
import { selectPickupLocation } from "../store/Pickupreducer";
import { selectDropoffLocation } from "../store/Pickupreducer";
import { selectTime } from "../store/timeSilice";
import { usePublishRideMutation } from "../store/Registerapisilice";
import { useNavigate } from "react-router-dom";

import { selectAccessToken } from "../store/selector";
function VehicleInformation() {
  const [vehicleName, setVehicleName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const date = useSelector(selectdate);
  const price = useSelector(selectPrice);
  const pickuplocation = useSelector(selectPickupLocation);
  const dropofflocation = useSelector(selectDropoffLocation);
  const { hours, minutes, period } = useSelector(selectTime);
  const [publishRide] = usePublishRideMutation();
  const token = useSelector((state) => state.auth.token);
  const passengers = useSelector(selectpassenger);
  const navigate = useNavigate();

  const handleVehicleNameChange = (event) => {
    setVehicleName(event.target.value);
  };

  const handleRegistrationNumberChange = (event) => {
    const input = event.target.value.toUpperCase();
    const regex = /^[A-Z]{2}-\d{2}-\d{4}$/;

    if (regex.test(input) || input === "") {
      setRegistrationNumber(input);
      setRegistrationError("");
    } else {
      setRegistrationError("Invalid registration number format");
    }
  };

  const handleLandmarkChange = (event) => {
    setLandmark(event.target.value);
  };

  const handleContinue = async () => {
    if (!registrationNumber) {
      setRegistrationError("Please enter a registration number");
      return;
    }

    const rideData = {
      vehicleName,
      registrationNumber,
      landmark,
      date,
      pickuplocation,
      dropofflocation,
      time: `${hours}:${minutes} ${period}`,
      price,
      passengers,
    };

    console.log(rideData);
    try {
      const response = await publishRide({ rideData, token }).unwrap();
      navigate("/Publishsucess");
      if (response.data) {
        console.log("Ride published successfully");
        navigate("/Publishsucess");
      }
    } catch (error) {
      console.error("Error publishing the ride:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Information</h2>
      <div className="w-64">
        <label className="block text-sm font-medium text-gray-700">
          Vehicle Name
        </label>
        <input
          type="text"
          className="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter Vehicle Name"
          value={vehicleName}
          onChange={handleVehicleNameChange}
        />
      </div>
      <div className="w-64 mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Registration Number
        </label>
        <input
          type="text"
          className="mt-1 p-2 rounded-lg border "
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChange={handleRegistrationNumberChange}
        />
        {registrationError && (
          <p className="text-red-500 text-sm mt-1">{registrationError}</p>
        )}
      </div>
      <div className="w-64 mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Landmark
        </label>
        <input
          type="text"
          className="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter Landmark"
          value={landmark}
          onChange={handleLandmarkChange}
        />
      </div>
      <button
        onClick={handleContinue}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        Continue
      </button>
    </div>
  );
}

export default VehicleInformation;
