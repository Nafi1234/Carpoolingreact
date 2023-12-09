import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userSubmitted,
  userSubmittedError,
  userSubmittedSuccess,
} from "../store/userSlice";

const OTPVerification = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.user);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const index = parseInt(e.target.name, 10);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleResendClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (response.ok) {
        setTimer(60);
        setError(null);
      } else {
        setError("Error resending OTP");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  const handleVerifyClick = async () => {
    const enteredOTP = otp.join("");
    const data = {
      otp: enteredOTP,
      email: email,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setError(null);

        navigate("/login", { successMessage: "Your account is activated." });
      } else {
        setError("Error verifying OTP");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setIsResendDisabled(false);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <div className="w-64 mx-auto mt-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Enter OTP</h2>
        <p className="text-gray-500">
          A 4-digit code has been sent to {email}.
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4].map((index) => (
          <input
            key={index}
            type="number"
            value={otp[index - 1]}
            onChange={handleOtpChange}
            name={index - 1}
            className="w-12 h-12 text-center border rounded-md"
          />
        ))}
      </div>
      <div className="text-center mt-4">
        {timer > 0 ? (
          <p className="text-gray-500">Resend in {timer} seconds</p>
        ) : (
          <button
            onClick={handleResendClick}
            className={`${
              isResendDisabled
                ? "bg-gray-300 text-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } py-2 px-4 rounded-md`}
            disabled={isResendDisabled}
          >
            Resend OTP
          </button>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleVerifyClick}
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
        >
          Verify OTP
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
