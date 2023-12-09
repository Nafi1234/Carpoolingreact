import Navbar from "../components/Navbar";
import TimeSelection from "../components/Timeselection";
import useAuthCheck from "../components/Check";
function Time() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <TimeSelection />
    </div>
  );
}

export default Time;
