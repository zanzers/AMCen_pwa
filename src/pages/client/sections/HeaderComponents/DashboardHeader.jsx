import { Bell, Settings} from "lucide-react";
import AMCenLogo from "../../../../components/svg_components/AMCenIcons";
import HeaderTab from "../HeaderComponents/HeaderTab";

export default function DashboardHeader({activeTab, setActivateTab}) {
  return (
    <header className=" w-full h-16 px-6 flex items-center ">

    <div className="flex items-center gap-3 min-w-fit cursor-pointer">
        
        <div className="w-9 h-9 text-white flex items-center justify-center font-bold text-lg">
        <AMCenLogo />
        </div>

        <div>
        <h1 className="font-bold text-lg leading-none">
            AMCen
        </h1>

        </div>
    </div>


  <div className="flex-1 flex justify-center">
    <HeaderTab activeTab={activeTab} setActiveTab={setActivateTab}/>
  </div>


  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4 min-w-fit">

    {/* SETTINGS */}
    <button
      className="
        w-9
        h-9
        rounded-full
        flex
        items-center
        justify-center
         bg-[#F0EFEC]
        hover:bg-[#FDFDFB]
        transition
      "
    >
      <Settings size={18} />
    </button>

    {/* NOTIFICATION */}
    <button
      className="
        w-9
        h-9
        rounded-full
        flex
        items-center
        justify-center
        bg-[#F0EFEC]
        hover:bg-[#FDFDFB]
        transition
        relative
      "
    >
      <Bell size={18} />

      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>

    {/* PROFILE */}
    <button className="flex items-center gap-3 pl-2">
      <img
        src="https://i.pravatar.cc/100"
        alt="profile"
        className="w-11 h-11 rounded-full object-cover"
      />
    </button>

    

  </div>

  
</header>
  );
}