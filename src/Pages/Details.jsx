import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Ridedetails from "../components/Ridedetails";

function Details() {
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setRenderComponent(true);
    }, 500);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div>
      {renderComponent && (
        <>
          <Navbar />
          <Ridedetails />
        </>
      )}
    </div>
  );
}

export default Details;
