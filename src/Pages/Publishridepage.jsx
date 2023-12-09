import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Publishedrided from "../components/Publishedride";
function Userpublish() {
  return (
    <div className="flex h-screen mt-20">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <div className="flex items-center justify-center h-full">
            <Publishedrided />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Userpublish;
