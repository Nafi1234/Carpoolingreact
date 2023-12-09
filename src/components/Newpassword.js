import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const { email } = useParams();
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/confirmpassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, confirm_password }),
        }
      );

      if (response.ok) {
        console.log("Password reset successful.");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error || "Password reset failed.");
      }
    } catch (error) {
      setError("An error occurred during password reset.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-center mb-4">Set New Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirm_password"
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Confirm your new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
