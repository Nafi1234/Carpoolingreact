import React from "react";

const NoRideAvailable = () => {
  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md text-center">
      <p className="text-2xl font-bold mb-4">No Ride Available</p>
      <p className="text-gray-600">
        We're sorry, but no rides are available for the specified search
        criteria. Please try again with different details or check back later.
      </p>
    </div>
  );
};

export default NoRideAvailable;
