import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile_setup from "./components/ui/Profile_setup";
import Dashboard from "./pages/client/Dashboard";
import ProfileComple from "./components/mini_pages/Profile_finish";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/user/profile-setup" element={<Profile_setup />} />
      <Route path="/user/ProfileComple" element={<ProfileComple />} />
      <Route path="/user/Dashboard" element={<Dashboard />} />





    </Routes>
  );
}