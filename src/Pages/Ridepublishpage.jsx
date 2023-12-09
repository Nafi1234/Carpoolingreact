import Navbar from "../components/Navbar";
import New from "../components/Stepper/New";
import useAuthCheck from "../components/Check";
function Ridepublishpage() {
  const isAuthenticated = useAuthCheck();

  if (isAuthenticated === null) {
    return null;
  }
  return (
    <div>
      <Navbar />

      <New />
    </div>
  );
}

export default Ridepublishpage;
