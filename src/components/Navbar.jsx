

import AMCenLogo from "../assets/image/AMCen_logo.png";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  const navigate = useNavigate();

  return (
    <>

      <header className="absolute flex justify-center bg-[#FDFDFB] top-0 left-0 z-50 w-full h-14">

        <nav
          className="grid grid-cols-3 items-center font-space px-10 text-black w-full"
          style={{ fontFamily: "Space Grotesk" }}
        >

          {/* LEFT */}
          <div className="justify-self-start">
            <img
              src={AMCenLogo}
              alt="AMCen"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* CENTER */}
          <ul className="hidden md:flex items-center justify-center gap-16 text-[12px] font-semibold uppercase tracking-widest">

            <li className="cursor-pointer hover:opacity-70 transition">
              Services
            </li>

            <li className="cursor-pointer hover:opacity-70 transition">
              Training
            </li>

            <li className="cursor-pointer hover:opacity-70 transition">
              Arduino
            </li>

            <li className="cursor-pointer hover:opacity-70 transition">
              Assistant
            </li>

          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-4 justify-self-end">

            <button
              onClick={() => navigate("/login")}
              className="cursor-[url(hand.cur),pointer] text-sm tracking-wider hover:opacity-70 transition"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="cursor-[url(hand.cur),pointer] text-[12px] rounded-lg border border-black px-5 py-2 tracking-wider bg-black text-white"
            >
              Sign Up
            </button>

          </div>

        </nav>

      </header>

      {/* MODALS */}

    
    </>
  );
}