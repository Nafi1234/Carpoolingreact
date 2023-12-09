import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fectchAdressSuggestions } from "./Stepper/Function.js/Suggestions";
import { setsearchcount } from "../store/searchpassenger";
import { setRides } from "../store/searchslice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Nosearchavailable() {
  const location = useLocation();
  const [availabledata, setAvailabledata] = useState();
  const [leavingFromSuggestions, setLeavingFromSuggestions] = useState([]);
  const [goingToSuggestions, setGoingToSuggestions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (location.state && location.state.availabledata) {
      console.log(
        "here giving the available data",
        location.state.availabledata
      );
      setAvailabledata(location.state.availabledata);
    }
  }, [location.state]);

  const handleDateChange = (e) => {
    setAvailabledata({
      ...availabledata,
      date: e.target.value,
    });
  };
  const handlepassengerChange = (e) => {
    setAvailabledata({
      ...availabledata,
      passengers: e.target.valu,
    });
  };
  const handlesearch = async () => {
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
          dispatch(setsearchcount(availabledata.passengers));

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
    <>
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <div className="bg-white p-3 shadow-xl rounded-lg border-black">
          <form className="flex flex-wrap">
            <div className="mb-4 flex-grow pr-2">
              <label
                htmlFor="leavingFrom"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Leaving From
              </label>
              <input
                type="text"
                className="form-input border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="leavingFrom"
                placeholder="Enter leaving from"
                value={availabledata?.leavingFrom}
                onChange={(e) => {
                  setAvailabledata({
                    ...availabledata,
                    leavingFrom: e.target.value,
                  });
                  fectchAdressSuggestions(e.target.value).then(
                    (suggestions) => {
                      setLeavingFromSuggestions(suggestions);
                    }
                  );
                }}
              />
              <ul className="absolute  mt-1 bg-white border border-gray-300 rounded">
                {leavingFromSuggestions.map((suggestions, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setAvailabledata({
                        ...availabledata,
                        leavingFrom: suggestions,
                      });
                      setLeavingFromSuggestions([]);
                    }}
                  >
                    {suggestions}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 flex-grow pr-2">
              <label
                htm
                lFor="goingTo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Going To
              </label>
              <input
                type="text"
                className="form-input border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="goingTo"
                placeholder="Enter going to"
                value={availabledata?.goingto}
                onChange={(e) => {
                  setAvailabledata({
                    ...availabledata,
                    goingto: e.target.value,
                  });
                  fectchAdressSuggestions(e.target.value).then(
                    (suggestions) => {
                      setGoingToSuggestions(suggestions);
                    }
                  );
                }}
              />
              <ul className="absolute  mt-1 bg-white border border-gray-300 rounded">
                {goingToSuggestions.map((suggestions, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setAvailabledata({
                        ...availabledata,
                        goingto: suggestions,
                      });
                      setGoingToSuggestions([]);
                    }}
                  >
                    {suggestions}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 flex-grow pr-2">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                className="form-input border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="date"
                min={getCurrentDate()}
                onChange={handleDateChange}
                value={availabledata?.date}
              />
            </div>
            <div className="mb-4 flex-grow pr-2">
              <label
                htmlFor="persons"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Number of Persons
              </label>
              <select
                className="form-select border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="persons"
                onChange={handlepassengerChange}
                value={availabledata?.passengers}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="mb-4 flex-grow pr-2 flex items-center pt-6">
              <button
                type="button"
                className="custom-search-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handlesearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <h1 className="text-center flex  ml-5 mt-20 ">
            No Rides Available. Search Again With a New Date or Pick Up or Drop
            Off
          </h1>
        </div>
      </div>
    </>
  );
}

export default Nosearchavailable;
