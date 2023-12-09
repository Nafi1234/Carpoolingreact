import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userSubmitted,
  userSubmittedSuccess,
  userSubmittedError,
} from "../store/userSlice";
import { submitUserData } from "../store/userApi";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userSubmitted());

    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.phone_number === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const resultAction = await dispatch(submitUserData(formData));
      if (submitUserData.fulfilled.match(resultAction)) {
        dispatch(userSubmittedSuccess(formData.email));
        navigate("/otp");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const registrationErrors = useSelector((state) => state.user.error);

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.first_name && (
            <p className="text-red-500">{registrationErrors.first_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.last_name && (
            <p className="text-red-500">{registrationErrors.last_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.phone_number && (
            <p className="text-red-500">{registrationErrors.phone_number}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.email && (
            <p className="text-red-500">{registrationErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.password && (
            <p className="text-red-500">{registrationErrors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {registrationErrors.non_field_errors && (
            <p className="text-red-500">
              {registrationErrors.non_field_errors}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-950 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={
              // Disable the button if any of the required fields are empty
              formData.first_name === "" ||
              formData.last_name === "" ||
              formData.phone_number === "" ||
              formData.email === "" ||
              formData.password === "" ||
              formData.confirm_password === ""
            }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
