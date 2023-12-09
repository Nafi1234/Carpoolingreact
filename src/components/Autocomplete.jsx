import React, { useState, useEffect } from "react";

const Autocomplete = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (value) {
      const delay = 300; // milliseconds

      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        const request = {
          input: value,
        };

        const autocompleteService =
          new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions(
          request,
          (predictions, status) => {
            if (status === "OK") {
              // Check if predictions array is not empty
              if (predictions.length > 0) {
                setSuggestions(predictions);
              } else {
                // No suggestions found
                setSuggestions([]);
              }
            } else {
              // Handle API request error
              console.error("API request failed with status: " + status);
            }
          }
        );
      }, delay);

      setTimer(newTimer);
    }
  }, [value]);

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a location"
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => onChange(suggestion.description)}
          >
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
