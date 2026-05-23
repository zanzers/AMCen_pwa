import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../api/api";
import { Turnstile } from "react-turnstile";

import FloatingInput from "../../components/ui/FloatingInput";
import GoogleIcon from "../../components/svg_components/googleIcons";
import Success_Register from "../../components/ui/SuccessReg";

export default function Register() {

  const navigate = useNavigate();

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

      if (!captchaToken) {
        alert("Please verify you are human");
        return;
      }

      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await fetch(
        API_URL,
        {
          method: "POST",
          body: JSON.stringify({
            action: "registerUser",
            captchaToken,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        setRegisterSuccess(true);

      } else {

        alert(data.message || "Registration Failed");

      }

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white border border-black/5 rounded-4xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-10">

        {

          registerSuccess ? (

          <Success_Register />

          ) : (

            <>

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
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
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

                <span
                  onClick={() => navigate("/login")}
                  className="ml-2 text-black cursor-pointer hover:opacity-70 transition"
                >
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

                  <GoogleIcon />

                  <span className="text-sm font-medium text-black/80">
                    Continue with Google
                  </span>

                </button>

              </div>

            </>

          )

        }

      </div>

    </div>

  );

}