import Navbar from "../components/Navbar";
import Nosearchavailable from "../components/Nosearchavailable";
function Nosearchavailablepage() {
  return (
    <div>
      <Navbar />
      <div className="flex mt-20">
        <Nosearchavailable />
      </div>
    </div>
  );
}

export default Nosearchavailablepage;
