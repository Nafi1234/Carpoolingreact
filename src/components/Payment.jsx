import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import axios from "axios";

const PaymentReview = () => {
  const { requestId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/publish/paymentreview/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        console.log("Here giving the data", data);
        setPaymentData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, [requestId, token]);

  const handlePaymentButtonClick = () => {
    razorPay();
    console.log("Handle payment button click");
  };

  const complete_order = (paymentID, orderID, signature) => {
    if (!paymentData) {
      console.error("Payment data is missing");
      return;
    } else {
      console.log(paymentData.id);
    }

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/publish/verifygateway",
      data: {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: paymentData.ride.fare,
        payment_method: "razorpay",
        ride_request: paymentData.ride.id,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const razorPay = () => {
    if (!paymentData) {
      console.error("Payment data is missing");
      return;
    }

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/publish/paymentgateway",
      data: {
        id: paymentData.id,
      },
    })
      .then((response) => {
        console.log(response.data.order_id);
        var order_id = response.data.order_id;
        console.log(order_id);

        const options = {
          key: "rzp_test_TpsHVKhrkZuIUJ",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
      <div className="text-2xl font-bold mb-4">Review the Ride</div>
      <div className="mb-4">
        <strong>Source:</strong>
        {paymentData?.ride?.source || "N/A"}
      </div>
      <div className="mb-4">
        <strong>
          Destination:
          {paymentData?.ride?.destination || "N/A"}
        </strong>
      </div>
      <div className="mb-4">
        <strong>Date:</strong>
        {paymentData?.ride?.date || "N/A"}
      </div>
      <div className="mb-4">
        <strong>Fare:</strong>
        {paymentData?.ride?.fare || "N/A"}
      </div>
      <div>
        <button
          onClick={handlePaymentButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentReview;
