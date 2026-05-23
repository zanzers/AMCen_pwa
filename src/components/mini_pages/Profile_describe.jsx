export default function Profile_Describe({
  setProfile,
  user,
  step
}) {

  const options = [
    "Student",
    "Business",
    "Engineer",
    "Maker",
    "Researcher",
    "Educator"
  ];

  return (

    <section className="w-full max-w-2xl">

      {/* TOP */}
      <div>

        <h1
          className="text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "Space Grotesk" }}
        >
          What best describes you?
        </h1>

        <p className="text-black/45 mt-4 text-sm">
          Help us personalize your experience.
        </p>

      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-4 mt-12">

        {
          options.map((item) => (

            <button
              key={item}
              onClick={() =>
                setProfile({
                  ...user,
                  usageType: item,
                })
              }
              className={`
                h-14
                rounded-2xl
                border
                transition

                ${
                  user.usageType === item
                    ? `
                      border-black
                      bg-black
                      text-white
                    `
                    : `
                      border-black/10
                      bg-white
                      hover:border-black
                    `
                }
              `}
            >
              {item}
            </button>

          ))
        }

      </div>

      {/* BOTTOM */}
      <div className="relative flex-col mt-14 flex items-center">

        {/* BUTTONS */}
        <div className="w-full flex items-center justify-between">

          {/* BACK */}
          <button
            onClick={() => step(2)}
            className="
              px-6
              h-8
              rounded-lg
              border
              border-black/10
              bg-white
              text-xs
              hover:border-black
              transition
            "
          >
            Back
          </button>

          {/* FINISH */}
          <button onClick={() => step(4)}
            className="
              px-6
              h-8
              rounded-lg
              bg-black
              text-xs
              text-white
              hover:opacity-90
              transition
            "
          >
            Finish
          </button>

        </div>

        {/* DOTS */}
        <div className="flex mt-16 items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-black/15"></div>

          <div className="w-2 h-2 rounded-full bg-black/15"></div>

          <div className="w-8 h-2 rounded-full bg-black"></div>

        </div>

      </div>

    </section>

  );

}