import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Userpage from "../Pages/Userpage";
import { usePublishridedetailsMutation } from "../store/Registerapisilice";
import WebSocketService from "./websocketservice";
import { Link } from "react-router-dom";
function Publishedrided() {
  const [bookingData, setBookingData] = useState(null);
  const token = localStorage.getItem("access_token");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [publishedride] = usePublishridedetailsMutation();
  const [resetKey, setResetKey] = useState(0);
  const [socket, setSocket] = useState(null);

  // Function to create a new WebSocket connection
  const createSocket = (rideId) => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws/ride/346/");

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.addEventListener("error", (event) => {
      console.error("WebSocket error in detail:", event);
    });

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);

      // Handle different message types if needed
      if (data.type === "ride_approved") {
        console.log("Ride approved:", data.message);
        // Handle the notification as needed
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return newSocket;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publishedride(token);
        console.log("arya ", response.data);
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [token, resetKey]);

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
      setMessage(result);
      setResetKey((prevKey) => prevKey + 1);
      console.log("Ride Accepted:", result);

      // Create a new WebSocket con nection
      const newSocket = createSocket(rideId);
      setSocket(newSocket);

      console.log("entering the socket <>><><><><><><><><><>><>");
      const data = {
        type: "ride_approved",
        rideId: rideId,
        message: "Ride accepted",
      };
      newSocket.send(JSON.stringify(data));
      console.log(
        "Before fetch call for notification API before notificationData"
      );

      const notificationData = {
        user: 5,
        content: "Ride accepted",
      };
      console.log("Before fetch call for notification API");
      try {
        console.log("Before notification API fetch call");
        const response = await fetch("http://127.0.0.1:8000/publish/notify/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(notificationData),
        });

        console.log("Notification API Response:", response);

        // Check the response status
        if (!response.ok) {
          console.error(
            "Notification API request failed:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error in notification API fetch:", error);
      }
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

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
      setResetKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error rejecting ride:", error);
    }
  };
  const handlePaymentLinkClick = (requestId) => {
    navigate(`/payment/${requestId}`);
  };

  const renderRideDetails = (ride) => {
    const matchingRequest =
      bookingData.requested_rides_matching_published &&
      bookingData.requested_rides_matching_published.find(
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
              <Link
                to={`/chat/${matchingRequest?.request_user}`}
                className="text-gray-700 ml-2"
              >
                Chat with driver
              </Link>
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
}
export default Publishedrided;
