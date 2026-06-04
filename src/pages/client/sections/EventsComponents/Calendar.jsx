import { useMemo, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December",];

const EVENTS = [
  {
    id: 1,
    title: "Arduino Workshop",
    date: "2026-06-15",
    type: "TRAINING",
  },
  {
    id: 2,
    title: "Research Seminar",
    date: "2026-06-20",
    type: "SEMINAR",
  },
  {
    id: 3,
    title: "Admin Away",
    date: "2026-06-18",
    type: "ADMIN_AWAY",
  },
];

const EVENT_STYLES = {
  TRAINING:
    "bg-blue-100 text-blue-700 border-blue-200",

  SEMINAR:
    "bg-purple-100 text-purple-700 border-purple-200",

  WORKSHOP:
    "bg-indigo-100 text-indigo-700 border-indigo-200",

  ADMIN_AWAY:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  MAINTENANCE:
    "bg-red-100 text-red-700 border-red-200",
};

export default function Calendar({ events}) {

  console.log("Dev Skip this Calendar features:");
  console.log("Calendar received events:", events);
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day);
    }

    return cells;
  }, [month, year]);

  const prevMonth = () =>
    setCurrentDate(
      new Date(year, month - 1, 1)
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(year, month + 1, 1)
    );

  return (
    <div className="rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">

        <button
          onClick={prevMonth}
          className="rounded-lg border px-3 py-2 hover:bg-gray-50"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold">
          {MONTHS[month]} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="rounded-lg border px-3 py-2 hover:bg-gray-50"
        >
          →
        </button>

      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-b p-4 text-sm">

        <Legend
          color="bg-blue-500"
          label="Training"
        />

        <Legend
          color="bg-purple-500"
          label="Seminar"
        />

        <Legend
          color="bg-yellow-500"
          label="Admin Away"
        />

      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 border-b">

        {DAYS.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">

        {calendarDays.map((day, index) => {

          if (!day) {
            return (
              <div
                key={index}
                className="min-h-32 border bg-gray-50"
              />
            );
          }

          const dateKey =
            `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;

          const dayEvents = EVENTS.filter(
            (event) =>
              event.date === dateKey
          );

          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <div
              key={index}
              className="min-h-32 border p-2"
            >

              <div
                className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                  isToday
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                {day}
              </div>

              <div className="space-y-1">

                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    className={`w-full truncate rounded border px-2 py-1 text-left text-xs ${EVENT_STYLES[event.type]}`}
                    onClick={() =>
                      console.log(event)
                    }
                  >
                    {event.title}
                  </button>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

function Legend({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${color}`}
      />
      <span>{label}</span>
    </div>
  );
}