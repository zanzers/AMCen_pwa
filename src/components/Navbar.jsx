export default function Navbar() {
  return (
    <header className="absolute flex justify-center bg-[#FDFDFB] top-0 left-0 z-50 w-full h-14"> 

      <nav className="grid grid-cols-3 items-center font-space px-10 text-black" style={{ fontFamily: "Space Grotesk" }}
>
        
        {/* Logo (Left column) */}
        <div className="text-2xl font-bold tracking-[0.2em] justify-self-start">
          AMCEN
        </div>

        {/* Navigation (Middle column - Centered) */}
        <ul className="hidden md:flex items-center justify-center gap-16 text-[12px] font-semibold uppercase tracking-wider justify-self-center">
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

        {/* Auth Buttons (Right column) */}
        <div className="flex items-center gap-4 justify-self-end">
          <button className="text-sm  tracking-wider hover:opacity-70 transition">
            Sign In
          </button>

          {/* <button className="rounded-full border border-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition">
            Register
          </button> */}
          <button className="text-[12px] rounded-full border border-black px-5 py-2 text-sm tracking-wider bg-black text-white hover:text-white transition">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}