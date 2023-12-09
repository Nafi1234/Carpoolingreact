import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setDate } from "../store/DateSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectKilometer } from "../store/KilometerSlice";
function Calendardate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const kilometer = useSelector(selectKilometer);
  console.log(kilometer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNextClick = () => {
    if (selectedDate) {
      console.log("here giving the date", selectedDate);
      const isoDateString = selectedDate.toISOString();
      dispatch(setDate(isoDateString));
      navigate("/Time");
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <h2 className="text-2xl font-semibold mb-4">Pickup Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        className="border p-2 rounded-lg text-center"
      />
      {selectedDate && (
        <div className="mt-4">
          <span className="text-xl" onClick={handleNextClick}>
            ➜
          </span>
        </div>
      )}
    </div>
  );
}

export default Calendardate;
