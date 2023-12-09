import Navbar from "../components/Navbar";
import RegistrationForm from "../components/Register";
function Registerpage() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-5">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registerpage;
