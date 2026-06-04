import { useNavigate } from "react-router-dom";


export default function ConsultationCard() {
  const navigate = useNavigate();

    const session = JSON.parse(sessionStorage.getItem("amcen_user"));
    console.log("ConsultationCard session:", session);


  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <span className="text-sm font-medium text-green-600">
        NEED HELP?
      </span>

      <h2 className="mt-2 text-xl font-bold">
        Request Consultation
      </h2>

      <p className="mt-2 text-gray-500">
        Get assistance with your projects,
        research papers, Arduino systems,
        3D printing, and more.
      </p>


      <button className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        onClick={() => navigate(`/user/events/consultationForm/${session.user.userId}`)}>
        Request Consultation
      </button>

    </div>
  );
}


