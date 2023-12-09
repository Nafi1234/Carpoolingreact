import { useEffect } from "react";
import { useRiderequestedMutation } from "../store/Registerapisilice";
const BookingCard = () => {
  const [bookingData, setBookingData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null)
  const [requestride] =useRiderequestedMutation()
  const Token = localStorage.getItem("access_token");
  useEffect (()=>{
    requestride(Token)
    .then((response)=>{
        console.log("Mutation response:",response)
        setBookingData(response.data)
    })
    .catch((error)=>{
        console.error(error);
    })
  },[]);

    return (
      <div
        key={ride.id}
        className="max-w-sm mx-auto mb-4 overflow-hidden rounded-lg shadow-lg"
      >
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">Date: {ride.date}</p>
          <p className="text-gray-700 text-base">Source: {ride.source}</p>
          <p className="text-gray-700 text-base">
            Destination: {ride.destination}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
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
