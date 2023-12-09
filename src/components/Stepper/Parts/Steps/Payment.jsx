import { useStepperContext } from "../../context/StepperContext";
import React, { useState } from "react";
import { setTime } from "../../../../store/timeSilice";
import { useDispatch } from "react-redux";
import { setPassengerCount } from "../../../../store/PassengerSlice";
import { setDate, setdate } from "../../../../store/DateSlice";
const YourComponent = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    selectedDate: "",
    selectedTime: "",
    numberOfPassengers: 1,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate >= currentDate) {
      setUserData({ ...userData, selectedDate });
      dispatch(setDate(selectedDate));
    }
  };
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    console.log(selectedTime);
    console.log("hour", selectedTime.slice(0, 2));
    console.log("minutes", selectedTime.slice(2));

    setUserData({ ...userData, selectedTime });
    dispatch(
      setTime({
        hours: selectedTime.slice(0, 2),
        minutes: selectedTime.slice(2),
      })
    );
  };

  console.log("heregiving userData", userData);
  const handlePassengerChange = (e) => {
    const numberOfPassengers = Math.min(Number(e.target.value), 5);
    setUserData({ ...userData, numberOfPassengers });
    dispatch(setPassengerCount(numberOfPassengers));
  };

  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Date
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleDateChange}
            value={userData["selectedDate"] || ""}
            name="selectedDate"
            type="date"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Time
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleTimeChange}
            value={userData["selectedTime"]}
            name="selectedTime"
            type="time"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      {/* Number of Passengers Selection */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Number of Passengers
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handlePassengerChange}
            value={userData["numberOfPassengers"]}
            name="numberOfPassengers"
            type="number"
            min="1"
            max="5"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
