import {RequestData} from "../RequestComponents/services/RequestServices";
import {useEffect, useState} from "react";
import EventCard from "../EventsComponents/EventsCard";

export default function UpcomingEvents() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const session = JSON.parse(sessionStorage.getItem("amcen_user"));
    


    useEffect(() => {
        async function loadEvents() {
            try{
                const response = await RequestData("getUpcomingEvents",{token: session.token, userId: session.user.userId,});
    
                console.log(response);
                setEvents(response || []);
            }catch (error) {
                console.error("Error loading events:", error);
            }finally {
                setLoading(false);
            }
        }
        
    loadEvents();
    }, []);

    if(loading){
        return (
            <div>
                Loading events...
            </div>
        );
    }


  return (

    
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-semibold">
        Upcoming Events
      </h2>

      <div className="space-y-4">

        {events.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}

      </div>
    </div>

//   <div>
//     <h1>Events Count: {events.length}</h1>

//     {JSON.stringify(events)}
//   </div>

  );
}





