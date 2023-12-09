import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setpickuplocation } from "../store/Pickupreducer";
import { useNavigate } from "react-router-dom";
export default function AutofillCheckoutDemo() {
  const [sourceAddress, setSourceAddress] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapboxToken =
    "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg"; // Replace with your Mapbox Access Token

  const handleSourceAddressChange = (e) => {
    const source = e.target.value;
    setSourceAddress(source);

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${source}.json?access_token=${mapboxToken}&country=IN`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from the response:", data);
        const sourceSuggestions = data.features.map(
          (feature) => feature.place_name
        );
        setSourceSuggestions(sourceSuggestions);
      })
      .catch((error) => {
        console.error("Error fetching source address suggestions:", error);
      });
  };

  const handleNextClick = () => {
    if (sourceAddress) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${sourceAddress}.json?access_token=${mapboxToken}&country=IN`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.features && data.features.length > 0) {
            const firstFeature = data.features[0];
            const coordinates = firstFeature.geometry.coordinates;
            console.log(firstFeature.geometry.coordinates[0]);
            const placeData = {
              name: sourceAddress,
              coordinates: {
                longitude: coordinates[0],
                latitude: coordinates[1],
              },
            };

            dispatch(setpickuplocation(placeData));
            navigate("/dropoff");
          }
        });
    } else {
      console.error("No source address selected");
    }
  };

  return (
    <div className="bg-white flex justify-center mt-28 h-screen">
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Pickup</h2>

        <div className="relative rounded-full bg-gray-200 p-2 shadow-lg max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Enter your source address"
            value={sourceAddress}
            onChange={handleSourceAddressChange}
            className="w-96 rounded-full py-2 pr-10 pl-12 outline-none focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          />

          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-indigo-600"
            onClick={handleNextClick}
          >
            ➡️
          </button>

          {sourceSuggestions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded bg-white absolute z-10 w-full shadow-lg">
              {sourceSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-400"
                  onClick={() => {
                    setSourceAddress(suggestion);
                    setSourceSuggestions([]);
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
