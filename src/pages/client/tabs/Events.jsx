import Calendar from "../sections/EventsComponents/Calendar";
import NextEventCard from "../sections/EventsComponents/NextEventCard";
import ConsultationCard from "../sections/EventsComponents/ConsultationCard";
import UpcomingEvents from "../sections/EventsComponents/UpcomingEvents";

export default function Events() {
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
        <NextEventCard />
        <ConsultationCard />
      </div>

      {/* Calendar */}
      <Calendar />

      {/* Upcoming Events */}
      <UpcomingEvents />
    </div>
  );
}