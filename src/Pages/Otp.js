import Navbar from "../components/Navbar";
import OTPForm from "../components/Otp";
function Otp() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <OTPForm />
      </div>
    </div>
  );
}

export default Otp;
