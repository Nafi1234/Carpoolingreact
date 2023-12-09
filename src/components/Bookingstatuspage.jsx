import React from "react";

const BookingStatusPage = () => {
  return (
    <div className="bg-yellow-300 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Your booking is</h1>
        <h1 className="text-3xl">awaiting the driver's</h1>
        <h1 className="text-3xl">approval</h1>
      </div>
      <button className="bg-white rounded-full text-black p-4 hover:bg-gray-200">
        See your booking request
      </button>
    </div>
  );
};

export default BookingStatusPage;
