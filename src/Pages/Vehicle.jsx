import Navbar from "../components/Navbar";
import VehicleInformation from "../components/Carvechicle";
import useAuthCheck from "../components/Check";
function Vehicle() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <VehicleInformation />
    </div>
  );
}

export default Vehicle;
