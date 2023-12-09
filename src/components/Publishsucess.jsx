import React from "react";

const PublishSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-500 text-white">
      <h2 className="text-4xl font-bold mb-4">
        You successfully published the Ride
      </h2>
      <button className="bg-white text-green-500 px-4 py-2 rounded">
        View the Ride
      </button>
    </div>
  );
};

export default PublishSuccess;
