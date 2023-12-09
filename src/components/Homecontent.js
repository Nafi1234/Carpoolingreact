import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import background from "../image/background.jpg";
import { setAccessToken } from "../store/Registerslice";
import { useSelector } from "react-redux";
import { useRideavailableMutation } from "../store/Registerapisilice";
import { setRides, setMessage } from "../store/searchslice";
import { useNavigate } from "react-router-dom";
import { setsearchcount } from "../store/searchpassenger";
function HomeContent() {
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const [leavingFromSuggestions, setLeavingFromSuggestions] = useState([]);
  const [goingToSuggestions, setGoingToSuggestions] = useState([]);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const storedValue = localStorage.getItem("access_token");
  console.log("stores", storedValue);

  const mapboxToken =
    "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg"; // Replace with your Mapbox Access Token

  const handleLeavingFromChange = (suggestion) => {
    setLeavingFrom(suggestion);
    setLeavingFromSuggestions([]);
  };

  const handleGoingToChange = (suggestion) => {
    setGoingTo(suggestion);
    setGoingToSuggestions([]);
  };

  const handleSourceAddressChange = (e) => {
    const source = e.target.value;
    setLeavingFrom(source);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${source}.json?access_token=${mapboxToken}&country=IN`
    )
      .then((response) => response.json())
      .then((data) => {
        const sourceSuggestions = data.features.map(
          (feature) => feature.place_name
        );
        setLeavingFromSuggestions(sourceSuggestions);
      })
      .catch((error) => {
        console.error("Error fetching source address suggestions:", error);
      });
  };

  const handleDestinationAddressChange = (e) => {
    const destination = e.target.value;
    setGoingTo(destination);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?access_token=${mapboxToken}&country=IN`
    )
      .then((response) => response.json())
      .then((data) => {
        const destinationSuggestions = data.features.map(
          (feature) => feature.place_name
        );
        setGoingToSuggestions(destinationSuggestions);
      })
      .catch((error) => {
        console.error("Error fetching destination address suggestions:", error);
      });
  };

  const handleRegistration = async () => {
    const availabledata = {
      leavingFrom: leavingFrom,
      goingto: goingTo,
      date: date,
      passengers: numberOfPersons,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/publish/rideavailable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(availabledata),
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        if (Array.isArray(responseData) && responseData.length > 0) {
          console.log("Here giving the responseData", responseData);
          dispatch(setsearchcount(numberOfPersons));

          dispatch(setRides(responseData));
          navigate("/Rideavailable");
        } else {
          navigate("/Nosearch", { state: { availabledata } });
          console.error("No rides available matching your criteria");
        }
      }
    } catch (error) {
      console.error("Ride availability error:", error);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container mx-auto h-full flex flex-row md:flex-row items-center border-black">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="bg-white p-3 rounded-lg shadow-lg md:ml-3 w-15">
            <h3 className="text-3xl font-semibold mb-4">Welcome</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="leavingFrom"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Leaving From
                </label>
                <input
                  type="text"
                  className="form-input border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="leavingFrom"
                  placeholder="Enter leaving from"
                  value={leavingFrom}
                  onChange={handleSourceAddressChange}
                />
                <ul>
                  {leavingFromSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleLeavingFromChange(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="goingTo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Going To
                </label>
                <input
                  type="text"
                  className="form-input border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="goingTo"
                  placeholder="Enter going to"
                  value={goingTo}
                  onChange={handleDestinationAddressChange}
                />
                <ul>
                  {goingToSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleGoingToChange(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  className="form-input border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  value={date}
                  min={getCurrentDate()}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="persons"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Number of Persons
                </label>
                <select
                  className="form-select border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="persons"
                  value={numberOfPersons}
                  onChange={(e) => setNumberOfPersons(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button
                type="button"
                className="custom-search-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleRegistration}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl font-bold text-gray-800">
            The Future of Sustainable Commuting
          </h1>
          <p className="text-gray-700">
            Choosing Share-a-Ride contributes to a more sustainable and
            eco-friendly future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
