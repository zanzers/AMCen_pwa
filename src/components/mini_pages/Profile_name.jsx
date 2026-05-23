import FloatingInput from "../ui/FloatingInput";

export default function Profile_Name({user, userProfile, step}){
    return(

        <section>
                <div className="w-full max-w-2xl">

        {/* TOP */}
        <div>

          <p className="text-sm  tracking-[0.25em] text-black/35 mb-4">
            Welcome to AMCen MIMAROPA
          </p>

          <h1
            className="text-3xl font-semibold tracking-tight"
            style={{ fontFamily: "Space Grotesk" }}
          >
            What should we call you?
          </h1>

          <p className="text-black/45 mt-4 text-sm">
            This will appear across your AMCen profile.
          </p>

        </div>

        {/* INPUT */}
        <div className="mt-10">

          <FloatingInput label={'Full Name'} type="text" placeholder="Full Name" className=" w-full bg-transparent border-b  border-black/15 pb-4 text-xl outline-none  placeholder:text-black/20  focus:border-black transition"
            value={user.fullName}
            onChange={(e) => userProfile({
                ...user,
                fullName: e.target.value,
            })}
            />
        </div>

        {/* BOTTOM */}
        <div className="relative flex-col mt-10 flex items-center">

          {/* NEXT BUTTON */}
          <button onClick={() => step(2)} className="py-2.5 absolute right-0 px-6 h-8 rounded-lg  bg-black text-xs  text-white hover:opacity-90 transition ">
            Next
          </button>

          {/* DOTS */}
          <div className=" flex mt-16 items-center gap-3">

            <div className="w-3 h-1 rounded-full bg-black"></div>

            <div className="w-3 h-1 rounded-full bg-black/15"></div>

            <div className="w-3 h-1 rounded-full bg-black/15"></div>

          </div>

        </div>

      </div>
    </section>


    )
}