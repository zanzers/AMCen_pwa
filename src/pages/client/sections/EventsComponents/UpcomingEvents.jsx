import EventCard from "../EventsComponents/EventsCard";

export default function UpcomingEvents({events}) {

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





