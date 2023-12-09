import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RequestedRide } from "../components/Requstedride";
import { useEffect, useState } from "react";
function Ridepages() {
  return (
    <div className="flex h-screen mt-20">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <div className="flex items-center justify-center h-full">
            <RequestedRide />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Ridepages;
