import { useState } from "react";

import DashboardHeader from "./sections/HeaderComponents/DashboardHeader";
import HomeTab from "./tabs/Home";
import RequestTab from "./tabs/Request";
import OrderTab from "./tabs/Order";
import EventsTab from "./tabs/Events";
import InboxTab from "./tabs/Inbox";


export default function Dashboar(){

    const [activeTab, setActivateTab] = useState(() => {
        const savedTab = sessionStorage.getItem("activeTab");
        if (savedTab) {
            sessionStorage.removeItem("activeTab");
            return savedTab;
        }
        return "Home";
    });

    const renderTab = () => {
        switch(activeTab){

            case "Home":
                return <HomeTab />
            case "Request":
                return <RequestTab />
            case "Orders":
                return <OrderTab setActivateTab={setActivateTab} />
            case "Events":
                return <EventsTab />
            case "Inbox":
                return <InboxTab />
            default:
                return <HomeTab />

            
        }
    }

    return(
       
       <div className="bg-[#F0EFEC]  w-full min-h-screen">
            <DashboardHeader 
            activeTab={activeTab}
            setActivateTab={setActivateTab}
            />

            <main className="px-6 py-5">
                {renderTab()}
            </main>
        </div>
    );
    
}