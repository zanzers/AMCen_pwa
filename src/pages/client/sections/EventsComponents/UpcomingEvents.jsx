import {RequestData} from "../RequestComponents/services/RequestServices";
import {useEffect, useState} from "react";


export default function UpcomingEvents() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            try{
                const response = await RequestData("getUpcomingEvents");
    
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
          <div
            key={event.eventId}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-medium">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500">
                {formatDateRange(event.start_date, event.end_date)}
              </p>
              <p className="text-sm text-gray-500">
                {formatTimeRange(event.start_time, event.end_time)}
              </p>
            

              <p className="text-sm text-green-600">
                {event.slots} slots available
              </p>
            </div>

            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              Register
            </button>
          </div>
        ))}

      </div>
    </div>

//   <div>
//     <h1>Events Count: {events.length}</h1>

//     {JSON.stringify(events)}
//   </div>

  );
}






function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(
    "en-PH",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

function formatTime(timeString) {
  return new Date(timeString).toLocaleTimeString(
    "en-PH",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}

function formatDateRange(startDate, endDate) {
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
}

function formatTimeRange(startTime, endTime) {
  return `${formatTime(startTime)} to ${formatTime(endTime)}`;
}