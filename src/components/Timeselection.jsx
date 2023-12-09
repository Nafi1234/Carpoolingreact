import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TimePicker from "react-time-picker";
import { setTime } from "../store/timeSilice";
import { useNavigate } from "react-router-dom";

function TimeSelection() {
  const [timer, setTimer] = useState({ hours: 12, minutes: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    setTimer({ hours: currentHours, minutes: currentMinutes });
  }, []);

  const handleTimeChange = (newTime) => {
    const [hours, minutes] = newTime.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";

    dispatch(setTime({ hours, minutes, period }));
  };

  const buttonOnclick = () => {
    navigate("/Passenger");
  };

  // Get the current time
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // Set the minimum time for the TimePicker
  const minTime = `${currentHours}:${currentMinutes}`;

  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Select Time</h2>
      <div
        className="relative rounded-lg border border-blue-500 p-4 hover:border-blue-500 hover:shadow-md cursor-pointer hover:bg-gray-200"
        style={{ borderRadius: "25px", width: "300px", height: "75px" }}
      >
        <div className="text-center">
          <TimePicker
            clockIcon
            clearIcon={null}
            onChange={handleTimeChange}
            value={`${timer.hours}:${timer.minutes}`}
            format="h:mm a"
            className="text-3xl font-bold"
            minTime={minTime}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        onClick={buttonOnclick}
      >
        Continue
      </button>
    </div>
  );
}

export default TimeSelection;
