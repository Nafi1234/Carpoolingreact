import Navbar from "../components/Navbar";
import RegistrationCard from "../components/Profile";
function Profile() {
  return (
    <div>
      <Navbar />
      <div className="flex mt-20">
        <RegistrationCard />
      </div>
    </div>
  );
}

export default Profile;
