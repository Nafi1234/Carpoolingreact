import Navbar from "../components/Navbar";
import Publish from "../components/Publishride";
import useAuthCheck from "../components/Check";
function Ridepublish() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />
      <Publish />
    </div>
  );
}

export default Ridepublish;
