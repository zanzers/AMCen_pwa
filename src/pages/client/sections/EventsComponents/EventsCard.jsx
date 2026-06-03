import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {

  const navigate = useNavigate();

  return (
    <div className="rounded-lg border p-4 flex justify-between items-center">

      {/* LEFT */}
      <div>
        <h3 className="font-medium">
          {event.title}
        </h3>

         {/* <p className="text-sm text-gray-500">
                {formatDateRange(event.start_date, event.end_date)}
              </p>
              <p className="text-sm text-gray-500">
                {formatTimeRange(event.start_time, event.end_time)}
              </p> */}

        <p className="text-sm text-gray-500">
          {event.slots} slots available
        </p>

        {event.isRegistered && (
          <p className="text-sm text-green-600">
            ✓ Registered
          </p>
        )}
      </div>

      {/* RIGHT */}
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
  );
}




// function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString(
//     "en-PH",
//     {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     }
//   );
// }

// function formatTime(timeString) {
//   return new Date(timeString).toLocaleTimeString(
//     "en-PH",
//     {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     }
//   );
// }

// function formatDateRange(startDate, endDate) {
//   return `${formatDate(startDate)} to ${formatDate(endDate)}`;
// }

// function formatTimeRange(startTime, endTime) {
//   return `${formatTime(startTime)} to ${formatTime(endTime)}`;
// }