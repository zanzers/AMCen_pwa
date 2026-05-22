import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../api/api";
import { Turnstile }
from "react-turnstile";

import FloatingInput from "../../components/ui/FloatingInput";



console.log(import.meta.env);

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const registerUser = async () => {

    try {

      if(!captchaToken){
        alert("Please verify you are human");
        return;
      }

      const res = await fetch(
        API_URL,
        {
          method: "POST",
          body: JSON.stringify({
            action: "registerUser",
            captchaToken,
            ...form,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      alert(JSON.stringify(data));

    } catch(err) {
      console.error(err);
    }

  };

  return (
  <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6">

    <div className="w-full max-w-md bg-white border border-black/5 rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10">

      {/* TOP */}
      <div className="flex flex-col items-center mb-8">

      
        <h1
          className="text-3xl font-semibold tracking-tight text-black"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Account Register
        </h1>

        <p className="text-sm text-black/50 mt-2">
          Create your AMCen account
        </p>

      </div>

      {/* FORM */}
      <div className="space-y-4">

        <FloatingInput
          label="Email"
          name="email"
          placeholder="Email Address"
          className="
            w-full
            h-13
            px-5
            rounded-2xl
            border
            border-black/10
            bg-[#F7F6F2]
            outline-none
            focus:border-black
            transition
          "
          onChange={handleChange}
        />

        <FloatingInput
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          className="
            w-full
            h-13
            px-5
            rounded-2xl
            border
            border-black/10
            bg-[#F7F6F2]
            outline-none
            focus:border-black
            transition
          "
          onChange={handleChange}
        />
        <FloatingInput
          label="Confirm Password"
          type="password"
          name="password"
          placeholder=" Confirm Password"
          className="
            w-full
            h-13
            px-5
            rounded-2xl
            border
            border-black/10
            bg-[#F7F6F2]
            outline-none
            focus:border-black
            transition
          "
          onChange={handleChange}
        />

      </div>

      {/* CAPTCHA */}
      <div className="mt-6 flex justify-center">

        <Turnstile
          sitekey="0x4AAAAAADSAzCI9q-ZaDdPu"
          options={{
            appearance: "always"
          }}
          onVerify={(token) => {
            console.log(token);
            setCaptchaToken(token);
          }}
        />

      </div>

      {/* TERMS */}
<div className="mt-5 flex items-start gap-3">

  <input
    type="checkbox"
    id="terms"
    className="
      mt-1
      h-4
      w-4
      rounded
      border-black/20
      accent-black
      cursor-pointer
    "
  />

  <label
    htmlFor="terms"
    className="text-sm leading-relaxed text-black/60"
  >
    I have read and agree to the{" "}

    <span className="text-black cursor-pointer hover:opacity-70 transition">
      Terms & Conditions
    </span>

    {" "}and{" "}

    <span className="text-black cursor-pointer hover:opacity-70 transition">
      Privacy Policy
    </span>

  </label>

</div>

      {/* BUTTON */}
      <button
        onClick={registerUser}
        className="
        cursor-[url(hand.cur),pointer]
          w-full
          h-13
          mt-6
          rounded-2xl
          bg-black
          text-white
          text-sm
          tracking-wide
          hover:opacity-90
          transition
        "
      >
        Create Account
      </button>

      {/* FOOTER */}
      <p className="text-center text-sm text-black/50 mt-6">

        Already have an account?

        <span onClick={() => navigate("/login")} className="ml-2 text-black cursor-pointer hover:opacity-70 transition">
          Sign In
        </span>

      </p>

      {/* MORE LOGIN METHODS */}
<div className="mt-7">

  {/* Divider */}
  <div className="flex items-center gap-4 mb-5">

    <div className="flex-1 h-px bg-black/10"></div>

    <span className="text-xs tracking-widest uppercase text-black/40">
      More Login Methods
    </span>

    <div className="flex-1 h-px bg-black/10"></div>

  </div>

  {/* GOOGLE BUTTON */}
  <button 
    className="
    cursor-[url(hand.cur),pointer]
      w-full
      h-13
      rounded-2xl
      border
      border-black/10
      bg-white
      flex
      items-center
      justify-center
      gap-3
      hover:border-black/20
      hover:bg-[#FAFAF8]
      transition
    "
  >

    {/* Google Icon */}
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7.1l6.2 5.2C39.9 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>

    <span className="text-sm font-medium text-black/80">
      Continue with Google
    </span>

  </button>

</div>

    </div>

  </div>
);
}

