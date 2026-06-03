import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RequestData } from "../RequestComponents/services/RequestServices";
import { ArrowLeft } from "lucide-react";



export default function ViewEvents() {

  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const session = JSON.parse(
    sessionStorage.getItem("amcen_user")
  );

  async function handleRegister() {

try {

      const res = await RequestData(
        "registerEvent",
        {
          token: session.token,
          userId: session.user.userId,
          eventId: event.eventId,
        }
      );

      console.log(res);

      if (res.success) {

        setEvent(prev => ({
          ...prev,
          isRegistered: true,
        }));

      }

    } catch (error) {

      console.error(
        "Registration failed:",
        error
      );

    }
  }

  useEffect(() => {

    async function loadEvent() {

      try {

        const res = await RequestData(
          "getEventById",
          {
            token: session.token,
            userId: session.user.userId,
            eventId: eventId,
          }
        );

        setEvent(res);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    }

    loadEvent();

  }, [eventId]);

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-6 space-y-4">

         <button className="flex items-center gap-2 text-gray-500" onClick={() => {
          sessionStorage.setItem("activeTab", "Events");
          navigate("/user/Dashboard");
        }}>
                  <ArrowLeft size={18} />
        </button>

      {/* TITLE */}
      <h1 className="text-2xl font-bold">
        {event.title}
      </h1>

      {/* LOCATION */}
      <p className="text-gray-500">
        📍 {event.location}
      </p>


      <p className="text-gray-500">
        {formatDateRange(event.start_date)} to {formatDateRange(event.end_date)}
      </p>


      <p className="text-gray-500">
        {formatTimeRange(event.start_time)} - {formatTimeRange(event.end_time)}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-4">
        {event.description}
      </p>

      {/* STATUS */}
      {event.isRegistered ? (
        <div className="text-green-600 font-medium mt-4">
          ✓ Registered — see you there
        </div>
      ) : (
       <button
        onClick={handleRegister}
        className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
        Join Us
        </button>
      )}

    </div>
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





