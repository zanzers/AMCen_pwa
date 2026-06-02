
export default function LoaderBar({ open, step }) {
  if (!open) return null;

  const steps = [
    { key: "uploading", label: "Uploading STL file" },
    { key: "generating", label: "Generating Order ID" },
    { key: "submitting", label: "Submitting request" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Processing request</h3>

        <div className="space-y-3">
          {steps.map((s, i) => {
            let state = "pending";
            const currentIndex = steps.findIndex((ss) => ss.key === step);
            const thisIndex = i;
            if (thisIndex < currentIndex) state = "done";
            else if (thisIndex === currentIndex) state = "active";

            return (
              <div key={s.key} className="flex items-center gap-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${state === 'done' ? 'bg-green-500' : state === 'active' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  {state === 'done' ? '✓' : thisIndex + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{s.label}</div>
                    <div className="text-sm text-gray-500">{state === 'done' ? 'Done' : state === 'active' ? 'In progress' : 'Pending'}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-2 bg-linear-to-r from-blue-500 to-blue-300 transition-all duration-500 ${state === 'done' ? 'w-full' : state === 'active' ? 'w-1/2' : 'w-0'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-sm text-gray-500">This may take a few moments depending on file size and server processing.</div>
      </div>
    </div>
  );
}
