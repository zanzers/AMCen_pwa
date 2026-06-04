import { useParams } from "react-router-dom";
import { useState } from "react";
import { RequestData } from "../RequestComponents/services/RequestServices";
import { useNavigate } from "react-router-dom";

export default function ConsultationForm() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const session = JSON.parse(sessionStorage.getItem("amcen_user"));
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({date: "",time: "",description: "",});




  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({...prev,[name]: value,}));
  }

  
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.date ||
      !formData.time ||
      !formData.description.trim()
    ) {
      alert("Please complete all fields.");
      return;
    }

    try {

      setSubmitting(true);

      const response = await RequestData(
        "saveConsultation",
        {
          token: session.token,
          userId,
          date: formData.date,
          time: formData.time,
          description: formData.description,
        }
      );

      console.log(
        "Consultation Response:",
        response
      );

      if (response?.success) {

        alert(
            "Consultation request submitted successfully."
        );

        sessionStorage.setItem(
            "activeTab",
            "Events"
        );

        navigate("/user/Dashboard");

} else {
        setFormData({
          date: "",
          time: "",
          description: "",
        });

      }

    } catch (error) {

      console.error(
        "Failed to submit consultation:",
        error
      );

    } finally {

      setSubmitting(false);

    }
  }

  return (
    <div className="flex justify-center px-4 py-8">

      <div className="w-full max-w-2xl rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-bold">
          Request Consultation
        </h2>

        <p className="mt-2 text-gray-500">
          Tell us what assistance you need and your preferred schedule.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              What assistance do you need?
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              placeholder="Describe your project, concern, or assistance needed..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium">
                Preferred Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Preferred Time
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Submit Request"}
          </button>

        </form>

      </div>

    </div>
  );
}