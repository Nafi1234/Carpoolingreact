import React, { useEffect, useState } from "react";
import { useRidedetailsMutation } from "../store/Registerapisilice";
import { useNavigate } from "react-router-dom";

export function RequestedRide() {
  const [ridedetails] = useRidedetailsMutation();
  const [requesteddetails, setrequesteddetails] = useState([]);

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ridedetails(token);
        console.log(response.data);
        setrequesteddetails(response.data.requested_rides_for_user || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [ridedetails, token]);
  const handleCardClick = (rideId) => {
    navigate(`Riderequestdetail/${rideId}`);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col lg:flex-col p-5">
        {requesteddetails.length === 0 ? (
          <p>No rides requested</p>
        ) : (
          requesteddetails.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 shadow-md"
              onClick={() => handleCardClick(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div>Source: {item.ride_details.source}</div>
              <div>Destination: {item.ride_details.destination}</div>
              {item.request_status === "Approved" &&
                item.payment_status === "unpaid" && <button>Pay Now</button>}

              {item.request_status === "pending" && (
                <p>Waiting for Driver Approval</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
