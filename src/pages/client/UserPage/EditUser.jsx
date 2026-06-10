export default function EditUser({open,onClose }) {


  console.log("Editor", open, onClose)
  if (!open) return null;

  return (
    <div className=" fixed inset-0 z-9999 flex items-center justify-center">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-xl bg-white
          p-6 shadow-xl
        "
      >
        <h2 className="mb-6 text-2xl font-bold">
          Edit Profile
        </h2>






        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-lg border
              px-4 py-2
            "
          >
            Cancel
          </button>

          <button
            className="
              rounded-lg bg-blue-600
              px-4 py-2 text-white
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}