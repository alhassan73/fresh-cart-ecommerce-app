import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container-fluid  p-5 bg-gray">
        <Outlet />
      </div>
      <Online>
        <div className="position-fixed bottom-0 start-0 bg-white p-1 rounded-5 ms-2 mb-2  shadow">
          <i className="fa-solid fa-wifi text-green"></i> 
        </div>
      </Online>
      <Offline>
        <div className="position-fixed bottom-0 start-0 bg-white p-1 rounded-5 ms-2 mb-2  shadow">
          <i className="fa-solid fa-ban text-danger"></i> 
        </div>
      </Offline>
      <Footer />
    </>
  );
}
