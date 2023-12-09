import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Userpage from "../Pages/Userpage";

const BookingCard = () => {
  const [bookingData, setBookingData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/publish/ridedetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("print", data);
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        // Add appropriate error handling or display a user-friendly error message
      }
    };

    fetchBookingData();
  }, [token]);

  const handleUserDetailsClick = (user, request_user) => {
    setSelectedUser(user);
    navigate(`/userdetails/${request_user}`);
  };

  const handleAcceptClick = async (rideId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/publish/accept/${rideId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setMessage(result); // Fix: Corrected variable name
      console.log("Ride Accepted:", result);
    } catch (error) {
      console.error("Error accepting ride:", error);
      // Add appropriate error handling or display a user-friendly error message
    }
  };
  console.log("hererprinting", bookingData);
  const handleRejectClick = async (rideId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/reject/${rideId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setMessage(result);
      console.log("Ride Rejected:", result);
    } catch (error) {
      console.error("Error rejecting ride:", error);
    }
  };
  const handlePaymentLinkClick = (requestId) => {
    navigate(`/payment/${requestId}`);
  };

  const renderRideDetails = (ride) => {
    const matchingRequest = bookingData.requested_rides_matching_published.find(
      (request) => request.ride === ride.id
    );
    console.log("hee", matchingRequest);
    if (matchingRequest) {
      console.log("true", matchingRequest.request_status);
    }

    return (
      <div
        key={ride.id}
        className="max-w-sm mx-auto mb-4 overflow-hidden rounded-lg shadow-lg"
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {matchingRequest && matchingRequest.request_user_details ? (
              <>
                Booking Request from{" "}
                <Link
                  to={`/userdetails/${matchingRequest.request_user}`}
                  onClick={() =>
                    handleUserDetailsClick(
                      matchingRequest.request_user_details,
                      matchingRequest.request_user
                    )
                  }
                >
                  {matchingRequest.request_user_details.first_name}
                </Link>
              </>
            ) : (
              "Published Ride"
            )}
          </div>

          <p className="text-gray-700 text-base">Date: {ride.date}</p>
          <p className="text-gray-700 text-base">Source: {ride.source}</p>
          <p className="text-gray-700 text-base">
            Destination: {ride.destination}
          </p>

          {matchingRequest && matchingRequest.request_status === "pending" && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAcceptClick(matchingRequest.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectClick(ride.id)}
                className="bg-red-300 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {selectedUser ? (
        <Userpage user={selectedUser} />
      ) : bookingData && bookingData.published_rides ? (
        bookingData.published_rides.map(renderRideDetails)
      ) : (
        <p>No published rides available</p>
      )}

      {bookingData && bookingData.requested_rides_for_user
        ? bookingData.requested_rides_for_user.map((request) => (
            <div key={request.id} className="mt-4">
              <p className="font-bold text-lg">
                Requested Ride for {request.ride_details.date}
              </p>
              <p className="text-gray-700 text-base">
                Source: {request.ride_details.source}
              </p>
              <p className="text-gray-700 text-base">
                Destination: {request.ride_details.destination}
              </p>
              {request.payment_status === "unpaid" &&
              request.request_status === "Approved" ? (
                <button
                  onClick={() => handlePaymentLinkClick(request.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Pay Now
                </button>
              ) : (
                <p>You paid for the ride</p>
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default BookingCard;
