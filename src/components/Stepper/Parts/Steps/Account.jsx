import { useStepperContext } from "../../context/StepperContext";
import { useState, useEffect } from "react";
import { fectchAdressSuggestions } from "../../Function.js/Suggestions";
import { setpickuplocation } from "../../../../store/Pickupreducer";
import { setdropofflocation } from "../../../../store/Pickupreducer";
import { fectchCorrdinate } from "../../Function.js/Coordinate";
import { useSelector, useDispatch } from "react-redux";
export default function Account() {
  const { userData, setUserData } = useStepperContext();
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
    if (name === "pickupAddress") {
      setSourceAddress(value);
    } else if (name === "dropoffAddress") {
      setDestinationAddress(value);
    }
  };

  const handleAddressChange = async (name, value) => {
    try {
      if (name === "pickupAddress") {
        setSourceAddress(value);

        const coordinates = await fectchCorrdinate(value);

        console.log("her", coordinates);
        console.log("latitude", coordinates[1]);
        dispatch(
          setpickuplocation({
            name: value,
            coordinates: {
              latitude: coordinates[1],
              longitude: coordinates[0],
            },
          })
        );
      } else if (name === "dropoffAddress") {
        setDestinationAddress(value);

        const coordinates = await fectchCorrdinate(value);
        console.log(coordinates);
        dispatch(
          setdropofflocation({
            name: value,
            coordinates: {
              latitude: coordinates[1],
              longitude: coordinates[0],
            },
          })
        );
      }
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleSuggestionClick = (suggestion, name) => {
    console.log("Clicked suggestion:", suggestion, name);
    handleAddressChange(name, suggestion);
    clearSuggestions(name);
  };

  const clearSuggestions = (name) => {
    if (name === "pickupAddress") {
      setSourceSuggestions([]);
    } else if (name === "dropoffAddress") {
      setDestinationSuggestions([]);
    }
  };

  const fetchSuggestions = async (address, setSuggestions) => {
    const suggestions = await fectchAdressSuggestions(address);
    setSuggestions(suggestions);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchSuggestions(sourceAddress, setSourceSuggestions);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [sourceAddress]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchSuggestions(destinationAddress, setDestinationSuggestions);
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [destinationAddress]);
  useEffect(() => {
    const delay = 1000;

    const timerId = setTimeout(() => {
      console.log("userData in context:", userData);
    }, delay);

    return () => clearTimeout(timerId);
  }, [userData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Pickup
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={(e) => handleChange(e)}
            value={sourceAddress}
            name="pickupAddress"
            placeholder="Pickup Address"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
        {sourceSuggestions.length > 0 && (
          <div>
            <ul>
              {sourceSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(suggestion, "pickupAddress")
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Dropoff
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={(e) => handleChange(e)}
            value={destinationAddress}
            name="dropoffAddress"
            placeholder="Dropoff Address"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
        {destinationSuggestions.length > 0 && (
          <div>
            <ul>
              {destinationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(suggestion, "dropoffAddress")
                  }
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
