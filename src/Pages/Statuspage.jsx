import BookingStatusPage from "../components/Bookingstatuspage";
import Navbar from "../components/Navbar";
import useAuthCheck from "../components/Check";
function Statuspage() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <BookingStatusPage />
    </div>
  );
}

export default Statuspage;
