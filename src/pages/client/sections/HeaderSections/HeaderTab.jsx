

const tabs = [
  "Home",
  "Request",
  "Orders",
  "Events",
  "Inbox",
];

export default function HeaderTab({activeTab, setActiveTab}) {


  return (
    <nav className="flex  items-center gap-10">

      {tabs.map((tab) => {

        const isActive = activeTab === tab;

        return (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="
              relative
              group
              cursor-pointer
              overflow-hidden
              pb-1
            "
          >

            {/* TEXT */}
            <span
              className="
                relative
                inline-block
                font-medium
              "
            >

              {/* DEFAULT TEXT */}
              <span
                className={`
                  transition-opacity
                  duration-300
                  ${
                    isActive
                      ? "opacity-0"
                      : "opacity-100 group-hover:opacity-0 text-gray-500"
                  }
                `}
              >
                {tab}
              </span>

              {/* FILL TEXT */}
              <span
                className={`
                  absolute
                  left-0
                  top-0
                  overflow-hidden
                  whitespace-nowrap
                  text-[#000000]
                  transition-all
                  duration-500
                  ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }
                `}
              >
                {tab}
              </span>

            </span>

            {/* ACTIVE UNDERLINE */}
            <div
              className={`
                absolute
                left-0
                bottom-0
                h-0.5
                w-full
                bg-[#000000]
                origin-left
                transition-transform
                duration-500
                ${
                  isActive
                    ? "scale-x-100"
                    : "scale-x-0"
                }
              `}
            />

          </div>
        );
      })}

    </nav>
  );
}