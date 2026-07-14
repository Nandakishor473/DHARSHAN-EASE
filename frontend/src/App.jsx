import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Profile from "./Users/Profile";
import ForgotPassword from "./Users/ForgotPassword";
import ResetPassword from "./Users/ResetPassword";
import Home from "./Users/Home";
import Login from "./Users/Login";
import Register from "./Users/Register";
import Temples from "./Users/Temples";
import TempleDetails from "./Users/TempleDetails";
import Booking from "./Users/Booking";
import Payment from "./Users/Payment";
import BookingSuccess from "./Users/BookingSuccess";
import MyBookings from "./Users/MyBookings";
import About from "./Users/About";
import Contact from "./Users/Contact";
import NotFound from "./Users/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import Donation from "./Users/Donation";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageTemples from "./Admin/ManageTemples";
import AddTemple from "./Admin/AddTemple";
import EditTemple from "./Admin/EditTemple";
import ManageSlots from "./Admin/ManageSlots";
import AddSlot from "./Admin/AddSlot";
import EditSlot from "./Admin/EditSlot";
import AllBookings from "./Admin/AllBookings";
import AllDonations from "./Admin/AllDonations";


function App() {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/mybookings" element={<ProtectedRoute><MyBookings /> </ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/temple-details/:id" element={<TempleDetails />} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>}/>
        <Route path="/payment" element={ <ProtectedRoute><Payment /></ProtectedRoute>}/>
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/donate" element={ <ProtectedRoute> <Donation /> </ProtectedRoute>}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/temples" element={<ManageTemples />} />
        <Route path="/admin/add-temple" element={<AddTemple />} />
        <Route path="/admin/edit-temple/:id" element={<EditTemple />} />
        <Route path="/admin/slots" element={<ManageSlots />} />
        <Route path="/admin/add-slot" element={<AddSlot />} />
        <Route path="/admin/edit-slot/:id" element={<EditSlot />} />
        <Route path="/admin/bookings" element={<AllBookings />} />
        <Route path="/admin/donations" element={<AllDonations />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;