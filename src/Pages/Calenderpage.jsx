import Navbar from "../components/Navbar";
import Calendardate from "../components/Pickdate";
import useAuthCheck from "../components/Check";
function Calendarpage() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <Calendardate />
    </div>
  );
}

export default Calendarpage;
