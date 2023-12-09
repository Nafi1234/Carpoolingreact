import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center ">
      <h1 className="text-red-500 text-2xl font-bold mb-4 mr-4 mt-6">
        You are not logged In
      </h1>
      <p className="text-gray-600 text-center mb-6 mt-8">
        For further booking, please log in or sign up.
      </p>
      <div className="text-center mt-8">
        <a href="/login" className="text-blue-500 hover:underline mr-4">
          Login
        </a>
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </div>
    </div>
  );
};
export default LoginPage;
