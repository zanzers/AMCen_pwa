import {useEffect, useState} from "react";
import {RequestData} from "../sections/RequestComponents/services/RequestServices"; 
import Calendar from "../sections/EventsComponents/Calendar";
import NextEventCard from "../sections/EventsComponents/NextEventCard";
import ConsultationCard from "../sections/EventsComponents/ConsultationCard";
import UpcomingEvents from "../sections/EventsComponents/UpcomingEvents";

export default function Events() {
  const [events, setEvents] = useState([]);
  const session = JSON.parse(sessionStorage.getItem("amcen_user"));
  
  
  console.log("Events in Events.jsx: render");
    useEffect(() => {
        async function loadEvents() {
            try{
                const response = await RequestData("getUpcomingEvents",{token: session.token, userId: session.user.userId,});
    
                console.log(response);
                setEvents(response || []);
            }catch (error) {
                console.error("Error loading events:", error);
            }
        }
        
    loadEvents();
    }, []);

    console.log("Events in Events.jsx:", events);


  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Events & Schedule
        </h1>

        <p className="mt-1 text-gray-500">
          Discover trainings, workshops, and AMCen activities.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        <NextEventCard  event={events[0]}/>
        <ConsultationCard />
      </div>

      {/* Calendar */}
      <Calendar  events={events} />

      {/* Upcoming Events */}
      <UpcomingEvents events={events} />
    </div>
  );
}