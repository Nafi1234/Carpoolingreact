import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectKilometer } from "../store/KilometerSlice";
import { setPrice } from "../store/Priceslice";
import { useNavigate } from "react-router-dom";
function SeatPriceSettings() {
  const kilometer = useSelector(selectKilometer);
  console.log(kilometer);
  const dispatch = useDispatch();
  const recommendedprice = Math.floor(kilometer * 10);
  const nextMultipleOfTen = Math.ceil(recommendedprice / 10) * 10;
  const [pricer, setPricer] = useState(nextMultipleOfTen);
  const navigate = useNavigate();

  const ButtonOnclick = () => {
    dispatch(setPrice(pricer));
    navigate("/Vechicleinformation");
  };

  const incrementPrice = () => {
    const newPrice = pricer + 20;
    setPricer(newPrice);
  };

  const decrementPrice = () => {
    const newPrice = pricer - 20;
    setPricer(newPrice);
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <h2 className="text-2xl font-semibold mb-4">Price for a Seat</h2>

      <div className="flex items-center">
        {/* Decrement button */}
        <button
          onClick={decrementPrice}
          className="w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center cursor-pointer"
        >
          -
        </button>

        {/* Calculated price */}
        <div className="w-20 h-20 flex items-center justify-center text-2xl font-bold">
          {pricer}
        </div>
        <button
          onClick={incrementPrice}
          className="w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center cursor-pointer"
        >
          +
        </button>
      </div>
      <p>
        RecommendedPrice Price for these Ride is Between {nextMultipleOfTen} and{" "}
        {nextMultipleOfTen + 50}
      </p>

      <button
        onClick={ButtonOnclick}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        Continue
      </button>
    </div>
  );
}

export default SeatPriceSettings;
