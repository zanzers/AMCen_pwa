export default function NextEventCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <span className="text-sm font-medium text-blue-600">
        NEXT EVENT
      </span>

      <h2 className="mt-2 text-xl font-bold">
        Arduino Fundamentals Workshop
      </h2>

      <p className="mt-2 text-gray-500">
        June 15, 2026 • 1:00 PM - 4:00 PM
      </p>

      <p className="mt-1 text-sm text-green-600">
        15 slots remaining
      </p>

      <button
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Register Now
      </button>

    </div>
  );
}