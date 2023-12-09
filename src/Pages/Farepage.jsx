import Navbar from "../components/Navbar";
import SeatPriceSettings from "../components/Fare";
import useAuthCheck from "../components/Check";
function Farepage() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <SeatPriceSettings />
    </div>
  );
}

export default Farepage;
