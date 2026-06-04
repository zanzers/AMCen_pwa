import { useNavigate } from "react-router-dom";


export default function NextEventCard({ event }) {
  
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {!event ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading Upcoming event...</p>
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-semibold">
            NEXT EVENT
          </h2>
    
          <div className="space-y-4">

            <h2>
              {event.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {/* {formatDate(event.start_date)} */}
            </p>

            <p className="mt-1 text-sm text-green-600">
              {event.slots} slots available
            </p>


            <button
              onClick={() =>
                navigate(`/user/events/${event.eventId}`, {
                  state: { event }
                })
              }
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              View Details
            </button>

    
          </div>
        </>
      )}
    </div>
  );
}