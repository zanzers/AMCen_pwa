import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile_setup from "./layouts/Profile_setup/ProfileSetup";
import Dashboard from "./pages/client/Dashboard";
import ProfileComple from "./layouts/Profile_setup/ProfileComplete";
import Checkout from "./pages/client/tabs/Checkout";
import ViewOrders from "./pages/client/sections/OrderComponents/ViewOrder";



export default function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/user/profile-setup" element={<Profile_setup />} />
      <Route path="/user/ProfileComple" element={<ProfileComple />} />
      <Route path="/user/Dashboard" element={<Dashboard />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/:orderId" element={<Checkout />} />
      <Route path="/user/orders/:orderId" element={<ViewOrders />} />




    </Routes>
  );
}