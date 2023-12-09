import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EnterOTP = () => {
  const { email, otp } = useParams();
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the email and OTP to the server for verification
      const response = await fetch(
        "http://127.0.0.1:8000/user/forgototpverification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: otpValue }),
        }
      );

      if (response.ok) {
        // Verification successful, navigate to SetNewPassword component
        console.log("Suceessfull");
        navigate(`/forgotpasswordnew/${email}/`);
      } else {
        // Handle verification error
        const data = await response.json();
        setError(data.error || "OTP verification failed.");
      }
    } catch (error) {
      setError("An error occurred during OTP verification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-600">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter the OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterOTP;
