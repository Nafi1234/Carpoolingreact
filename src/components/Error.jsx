// Error404.js

import React from "react";

const Error404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might not exist or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error404;
