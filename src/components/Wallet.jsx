import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWalletMutation } from "../store/Registerapisilice";
function Wallet() {
  const [balance, setBalance] = useState(0);
  const [wallet] = useWalletMutation();
  const Token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await wallet(Token);
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-16">
      <h2 className="text-lg font-semibold mb-4">Wallet Balance</h2>
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">₹{balance}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <p className="text-gray-600 text-sm mt-2">
        Your current wallet balance. Use this amount for your rides.
      </p>
    </div>
  );
}

export default Wallet;
