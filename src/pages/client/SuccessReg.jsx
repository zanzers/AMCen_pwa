import { useNavigate } from "react-router-dom";



export default function Success_Register(){
    const navigate = useNavigate();
    return(
    
          <div className="flex flex-col items-center text-center space-y-6 py-10">

               

              <div className="w-20 h-20 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-4xl font-bold  animate-spin-once">
                ✓
              </div>

              <div>

                <h1
                  className="text-3xl font-semibold"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  Account Successfully Created
                </h1>

                <p className="text-black/50 mt-3">
                  Your AMCen account is ready.
                </p>

              </div>

              <button
                onClick={() => navigate("/login")}
                className="
                  cursor-[url(hand.cur),pointer]
                  w-full
                  h-13
                  rounded-2xl
                  bg-black
                  text-white
                  hover:opacity-90
                  transition
                "
              >
                Login Now
              </button>

            </div>
    )
}