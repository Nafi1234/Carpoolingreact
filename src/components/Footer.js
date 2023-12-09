import React from "react";

function Footer() {
  return (
    <footer className="bg-yellow-300 py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-gray-700">&copy; 2023 Your Company Name</p>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right mt-2 md:mt-0">
            <ul className="text-gray-700">
              <li className="inline-block ml-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="inline-block ml-4">
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li className="inline-block ml-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
