import Navbar from "../components/Navbar";
import PassengerSelection from "../components/Passengerselection";
import useAuthCheck from "../components/Check";
function Noofpassenger() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <PassengerSelection />
    </div>
  );
}

export default Noofpassenger;
