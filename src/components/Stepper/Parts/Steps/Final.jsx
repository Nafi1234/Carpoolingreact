import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPrice } from "../../../../store/Priceslice";
import {
  setVehicleName,
  setRegistrationNo,
} from "../../../../store/Vehiclename";
export default function Final() {
  const [fare, setFare] = useState(0);
  const [vehicleName, setVehicleNameInput] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [message, setMessage] = useState(" ");
  const dispatch = useDispatch();

  const handleRegistrationNumberChange = (event) => {
    const input = event.target.value.toUpperCase();
    setRegistrationNumber(input);
    console.log(input);
    dispatch(setRegistrationNo(input));
    const regex = /^[A-Z]{2}\d{4}$/;
    setMessage(regex.test(input) ? "" : "Enter a valid input");
  };

  const handleFareSelection = (selectedFare) => {
    setFare(selectedFare);
    dispatch(setPrice(selectedFare));
  };

  const handleVehicleNameChange = (event) => {
    const input = event.target.value;
    setVehicleNameInput(input);
    dispatch(setVehicleName(input));
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">{/* ... Your SVG code here ... */}</div>

        <div className="mt-4">
          <label
            htmlFor="fare"
            className="block text-sm font-medium text-gray-700"
          >
            Fare:
          </label>
          <input
            type="number"
            id="fare"
            value={fare}
            onChange={(e) => handleFareSelection(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="vehicleName"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Name:
          </label>
          <input
            type="text"
            id="vehicleName"
            value={vehicleName}
            onChange={handleVehicleNameChange}
            className="mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Registration No:
          </label>
          <input
            type="text"
            id="registrationNumber"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
            className="mt-1 p-2 border rounded-md"
          />
          <p className="text-sm text-gray-500">Format: KL0000 (e.g., KL1234)</p>
          <p className="text-sm text-red-500">{message}</p>
        </div>
      </div>
    </div>
  );
}
