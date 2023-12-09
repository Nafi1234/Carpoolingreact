import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useRequestridedetailMutation } from "../store/Registerapisilice";
import ridedeatails from "../store/ridedeatails";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Requestridedetail() {
  const [ridedetails, setRidedetails] = useState([]);
  const { rideId } = useParams();
  const [requestrides] = useRequestridedetailMutation();
  const [showPayButton, setShowPayButton] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const navigate = useNavigate();

  const [Razorpay] = useRazorpay();

  const token = localStorage.getItem("access_token");
  console.log("here giving the token", token, rideId);
  console.log("here giving the ridedetails", ridedetails?.ride?.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestrides({ token, rideId });
        console.log(response.data);
        setRidedetails(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [requestrides, token, rideId]);
  console.log("req", ridedetails.request_date);
  const handlePaymentButtonClick = () => {
    razorPay();
    console.log("Handle payment button click");
  };

  const complete_order = (paymentID, orderID, signature) => {
    if (!ridedeatails) {
      console.error("Payment data is missing");
      return;
    } else {
      console.log(ridedeatails.id);
    }
    console.log("here giving the payment", paymentID);
    console.log("here giving the order_id", orderID);
    console.log("here", signature);
    console.log("ride_request", ridedetails.id);

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/publish/verifygateway",
      data: {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: ridedetails?.ride?.fare,
        payment_method: "razorpay",
        ride_request: ridedetails.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        setShowPayButton(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const razorPay = () => {
    if (!ridedeatails) {
      console.error("Payment data is missing");
      return;
    }

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/publish/paymentgateway",
      data: {
        id: ridedetails.id,
      },
    })
      .then((response) => {
        console.log(response.data.order_id);
        var order_id = response.data.order_id;
        console.log(order_id);
        const amountInPaise = ridedetails?.ride?.fare * 100;

        const options = {
          key: "rzp_test_TpsHVKhrkZuIUJ",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",

          order_id: order_id,
          Price: amountInPaise,
          handler: function (response) {
            complete_order(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  // Your React component (Requestridedetail.js)

  const handleCancelRide = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/publish/cancel_ride/${ridedetails.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/Ride");
        console.log(data.message);
        setShowCancelPopup(false);
      } else {
        console.error(
          "Failed to cancel ride:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error cancelling ride:", error);
    }
  };

  if (ridedeatails) {
    console.log("here giving", ridedeatails);
  }

  return ridedetails ? (
    <div className="flex flex-col items-center mt-20">
      <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-2xl font-bold text-black">
            {ridedetails?.request_date}
          </h1>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {" "}
            {ridedetails?.ride?.source}
          </p>{" "}
          {/* Fixed closing tag for source */}
          <div className="h-2 w-2 rounded-full bg-gray-700 "></div>
          <div className="border-l border-gray-700 h-8 mr-2"></div>
          <div className="h-2 w-2 rounded-full bg-gray-700"></div>
          <p className="text-gray-700 text-base">
            {ridedetails?.ride?.destination}
          </p>
        </div>
        <div className="border-t border-gray-900 h-3"></div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Fare</p>
            <p className="text-lg font-semibold text-gray-700">
              {ridedetails?.ride?.fare}
            </p>
            {ridedetails.payment_status === "unpaid" && showPayButton && (
              <button onClick={handlePaymentButtonClick}>Pay Now</button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-900 h-3"></div>
        <div className="flex items-center mt-2">
          <p className="text-lg font-semibold mr-2">
            Name of the driver:{ridedetails?.ride?.user_details?.first_name}
            {ridedeatails?.ride?.user}
          </p>
          {ridedeatails?.ride?.user}
          <p className="text-gray-700 text-base "></p>
        </div>
        <div className="border-t border-gray-900 h-3"></div>

        <div className="flex  mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 7.4 2 13c0 4.94 4.78 10 10 10 5.22 0 10-5.06 10-10 0-5.6-4.48-11-10-11zm1 14.08V13h-2v3.08a8.062 8.062 0 0 0 2 0zM12 11c-.86 0-1.58.53-1.87 1.27l-2.42-2.42a1.077 1.077 0 0 0-1.61 0 1.078 1.078 0 0 0 0 1.61l2.42 2.42C10.47 13.42 11.23 13 12 13s1.53.42 2.08 1.27l2.42-2.42a1.078 1.078 0 0 0 0-1.61 1.077 1.077 0 0 0-1.61 0l-2.42 2.42C13.58 11.53 12.86 11 12 11z" />
          </svg>

          <Link
            to={`/chat/${ridedetails?.ride?.user}`}
            className="text-gray-700 ml-2"
          >
            Ask a question
          </Link>
          <button onClick={handleCancelClick} className="ml-2 text-red-500">
            Cancel Ride
          </button>

          {/* Cancel Ride Confirmation Pop-up */}
          {showCancelPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <p>Are you sure you want to cancel the ride?</p>
                <div className="flex justify-end mt-2">
                  <button onClick={() => setShowCancelPopup(false)}>No</button>
                  <button
                    onClick={handleCancelRide}
                    className="ml-2 bg-red-500 text-white"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Requestridedetail;
