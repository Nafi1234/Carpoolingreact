import Navbar from "../components/Navbar";
import Destination from "../components/Destination";
import useAuthCheck from "../components/Check";
function Dropoff() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <Destination />
    </div>
  );
}

export default Dropoff;
