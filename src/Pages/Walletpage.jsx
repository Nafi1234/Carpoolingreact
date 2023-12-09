import Navbar from "../components/Navbar";
import Wallet from "../components/Wallet";
function Walletpage() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-20">
        <Wallet />
      </div>
    </div>
  );
}

export default Walletpage;
