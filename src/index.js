import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Home from "./Pages/Home";
import Registerpage from "./Pages/Registerpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import Otp from "./Pages/Otp";
import Login from "./Pages/Login";
import Emailforgot from "./Pages/Emailforgot";
import Forgototpverify from "./Pages/Forgototpverify";
import Newpasswordpage from "./Pages/Newpasswordpage";
import Profile from "./Pages/Profile";
import Ridepublish from "./Pages/Ridepublish";
import Dropoff from "./Pages/dropoff";
import Navigation from "./Pages/Navigation";
import Calendarpage from "./Pages/Calenderpage";
import Time from "./Pages/Time";
import Noofpassenger from "./Pages/Noofpassenger";
import Farepage from "./Pages/Farepage";
import Vehicle from "./Pages/Vehicle";
import Ride from "./Pages/Ride";
import Details from "./Pages/Details";
import Loginmessagepage from "./Pages/Loginmessagepage";
import Statuspage from "./Pages/Statuspage";
import BookingCard from "./components/Userride";
import Bookedride from "./Pages/Bookedride";
import Publishsucesspage from "./Pages/Publishsucesspage";
import Todolist from "./components/Todolist";
import Userpage from "./Pages/Userpage";
import Paymentpage from "./Pages/Paymentpage";
import Nosearchpage from "./Pages/Nosearchpage";
import New from "./components/Stepper/New";
import Sidebar from "./components/Sidebar";
import Ridepages from "./Pages/Ridepages";
import Ridepublishpage from "./Pages/Ridepublishpage";
import Requestridedetailpage from "./Pages/Requestridedetailpage";
import Userpublish from "./Pages/Publishridepage";
import Chatpage from "./Pages/Chatpage";
import ChatComponent from "./components/Chathome";
import Walletpage from "./Pages/Walletpage";
import Nosearchavailablepage from "./Pages/Nosearchavailablepage";
import Error404 from "./components/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register/",
        element: <Registerpage />,
      },
      {
        path: "otp/",
        element: <Otp />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "forgot-password/",
        element: <Emailforgot />,
      },
      {
        path: "/enter-otp/:email",
        element: <Forgototpverify />,
      },
      {
        path: "/forgotpasswordnew/:email",
        element: <Newpasswordpage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "publish/",
        element: <Ridepublish />,
      },
      {
        path: "dropoff/",
        element: <Dropoff />,
      },
      {
        path: "Navigation/",
        element: <Navigation />,
      },
      {
        path: "pickup-date/",
        element: <Calendarpage />,
      },
      {
        path: "Time/",
        element: <Time />,
      },
      {
        path: "Passenger/",
        element: <Noofpassenger />,
      },
      {
        path: "Fare/",
        element: <Farepage />,
      },
      {
        path: "Vechicleinformation/",
        element: <Vehicle />,
      },
      {
        path: "Rideavailable",
        element: <Ride />,
      },
      {
        path: "ridedetails/:rideId",
        element: <Details />,
      },
      {
        path: "Loggedin",
        element: <Loginmessagepage />,
      },
      {
        path: "status",
        element: <Statuspage />,
      },
      {
        path: "Bookedride",
        element: <Bookedride />,
      },
      {
        path: "Publishsucess",
        element: <Publishsucesspage />,
      },
      {
        path: "New",
        element: <Sidebar />,
      },
      {
        path: "userdetails/:userid",
        element: <Userpage />,
      },
      {
        path: "payment/:requestId",
        element: <Paymentpage />,
      },
      {
        path: "noride",
        element: <Nosearchpage />,
      },
      {
        path: "Ride",
        element: <Ridepages />,
      },
      {
        path: "Ride/Riderequestdetail/:rideId",
        element: <Requestridedetailpage />,
      },
      {
        path: "Ridepublish",
        element: <Ridepublishpage />,
      },
      {
        path: "Publishedride",
        element: <Publishsucesspage />,
      },
      {
        path: "userpublish",
        element: <Userpublish />,
      },
      {
        path: "chat/:rideId",
        element: <ChatComponent />,
      },
      {
        path: "wallet",
        element: <Walletpage />,
      },
      {
        path: "Nosearch",
        element: <Nosearchavailablepage />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
