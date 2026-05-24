import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AMCenLogo from "../../components/svg_components/AMCenIcons";

export default function Profile_Complete() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/user/dashboard");

    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  return (

    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6">

      <div className="text-center space-y-8">

        {/* LOGO */}
        <div className="flex justify-center">

          <AMCenLogo width={60} />

        </div>

        {/* CHECK */}
        <div className="flex justify-center">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-[#22C55E]
              flex
              items-center
              justify-center
              text-white
              text-4xl
              font-bold
            "
            style={{
              animationDuration: "1s",
            }}
          >
            ✓
          </div>

        </div>

        {/* TEXT */}
        <div>

          <h1
            className="text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Everything is ready.
          </h1>

          <p className="text-black/45 mt-4">
            Let’s start building with AMCen.
          </p>

        </div>

        {/* REDIRECT */}
        <p className="text-sm text-black/30">
          Redirecting...
        </p>

      </div>

    </div>

  );

}