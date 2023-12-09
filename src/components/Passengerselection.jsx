import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPassengerCount } from "../store/PassengerSlice";
import { useNavigate } from "react-router-dom";

function PassengerSelection() {
  const [passengersCount, setPassengersCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const incrementPassengerCount = () => {
    if (passengersCount < 5) {
      setPassengersCount(passengersCount + 1);
    }
  };

  const decrementPassengerCount = () => {
    if (passengersCount > 1) {
      setPassengersCount(passengersCount - 1);
    }
  };

  const handleContinue = () => {
    dispatch(setPassengerCount(passengersCount));
    navigate("/Fare");
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <h2 className="text-2xl font-semibold mb-4">Number of Passengers</h2>
      <div className="flex items-center">
        <button
          onClick={decrementPassengerCount}
          className="rounded-full w-12 h-12 border border-blue-500 flex items-center justify-center cursor-pointer"
        >
          -
        </button>
        <div className="w-12 h-12 flex items-center justify-center">
          {passengersCount}
        </div>
        <button
          onClick={incrementPassengerCount}
          className="rounded-full w-12 h-12 border border-blue-500 flex items-center justify-center cursor-pointer"
        >
          +
        </button>
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

export default PassengerSelection;
