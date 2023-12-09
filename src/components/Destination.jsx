import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setdropofflocation } from "../store/Pickupreducer";
import { useNavigate } from "react-router-dom";

export default function Destination() {
  const [destinationAddress, setdestinationAddress] = useState("");
  const [destinationSuggestions, setdestinationSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapboxToken =
    "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg";

  const handledestinationaddresschange = (e) => {
    const source = e.target.value;
    setdestinationAddress(source);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${source}.json?access_token=${mapboxToken}&country=IN`
    )
      .then((response) => response.json())
      .then((data) => {
        const destinationSuggestions = data.features.map(
          (feature) => feature.place_name
        );
        setdestinationSuggestions(destinationSuggestions);
      })
      .catch((error) => {
        console.error("Error fetching source address suggestions:", error);
      });
  };

  const handleNextClick = () => {
    if (destinationAddress) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${destinationAddress}.json?access_token=${mapboxToken}&country=IN`
      )
        .then((response) => response.json())
        .then((data) => {
          const firstFeature = data.features[0];
          const coordinates = firstFeature.geometry.coordinates;
          const placeData = {
            name: destinationAddress,
            coordinates: {
              longitude: coordinates[0],
              latitude: coordinates[1],
            },
          };
          console.log("here goinigng", placeData);
          dispatch(setdropofflocation(placeData));
          navigate("/navigation");
        });
    } else {
      console.error("No source address selected");
    }
  };

  return (
    <div className="bg-white flex justify-center mt-28 h-screen">
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Drop OFF</h2>

        <div className="relative rounded-full bg-gray-200 p-2 shadow-lg max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Enter your source address"
            value={destinationAddress}
            onChange={handledestinationaddresschange}
            className="w-96 rounded-full py-2 pr-10 pl-12 outline-none focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />

          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-indigo-600"
            onClick={handleNextClick}
          >
            ➡️
          </button>

          {destinationSuggestions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded bg-white absolute z-10 w-full shadow-lg">
              {destinationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-400"
                  onClick={() => {
                    setdestinationAddress(suggestion);
                    setdestinationSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
