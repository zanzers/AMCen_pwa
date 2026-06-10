// import { useParams } from "react-router-dom";
import { Pencil, ArrowLeft } from "lucide-react";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser";
import { useState } from "react";


export default function UserPage() {
  const scrollToSection = (id) => {document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });};
  const session = JSON.parse(sessionStorage.getItem("amcen_user")) || {};
  const navigate = useNavigate();
  const [openEditor, setOpenEditor] = useState(false);


  return (
    <div className="mx-auto flex max-w-7xl gap-12 px-6 py-10">
      <aside className="sticky top-6 hidden h-fit w-64 md:block">
        <button onClick={() => navigate("/user/dashboard")} className="mb-8 flex items-center gap-2 text-gray-600 transition hover:text-black">
            <ArrowLeft size={24} />
        </button>

        <nav className="space-y-2">
          <button onClick={() => scrollToSection("account")} className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100">
            Account
          </button>

          <button onClick={() => scrollToSection("privacy")} className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100">
            Privacy & Security
          </button>

          <button onClick={() => scrollToSection("notifications")} className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100">
            Notifications
          </button>

          <div className="pt-6">
            <button className="w-full rounded-lg px-4 py-3 text-left text-red-500 transition hover:bg-red-50">
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">

        {/* ================= ACCOUNT ================= */}
        <section id="account" className="scroll-mt-20 border-b pb-20" >
          <h2 className="mb-10 text-3xl font-bold">
            Account
          </h2>

          <div className="mx-auto max-w-xl">
            {/* Avatar */}
            <div className="mb-10 flex justify-center">
              <div className="relative">

               <UserImage profileImgId={session.user?.profileImgId} img_width={140} img_height={140} />

                <button onClick={() => setOpenEditor(true)} className=" absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100">
                  <Pencil size={16} />
                </button>

                <EditUser open={openEditor} onClose={() => setOpenEditor(false)}/>
              </div>
            </div>

       
            <div className="space-y-6">
              <div className="flex justify-between border-b py-3">
                <span className="font-medium text-gray-500">
                    UID:
                </span>

                <span className="mr-8 text-gray-500">
                    {session.user.userId}
                </span>
            </div>
              <div className="flex justify-between border-b py-3">
                <span className="font-medium text-gray-500">
                    Name:
                </span>

                <span className="mr-8">
                    {session.user.fullName}
                </span>
            </div>

              <div className="flex justify-between border-b py-3">
                <span className="font-medium text-gray-500">
                    Email:
                </span>

                <span className="mr-8">
                    {session.user.email}
                </span>
            </div>

              <div className="flex justify-between border-b py-3">
                <span className="font-medium text-gray-500">
                    Phone Number [optional]:
                </span>

                <span className="mr-8">
                        {/* +63 912 345 6789     */}
                </span>
            </div>
   
            </div>    
           
          </div>
        </section>


        {/* ================= PRIVACY ================= */}
      <section
  id="privacy"
  className="scroll-mt-20 border-b py-20"
>
  <h2 className="mb-10 text-center text-3xl font-bold">
    Privacy & Security
  </h2>

  <div className="mx-auto max-w-xl space-y-4">

    <div className="flex justify-between border-b py-3">
      <span className="font-medium text-gray-500">
        Password
      </span>

      <button className="text-blue-600 hover:underline">
        Change Password
      </button>
    </div>

    <div className="flex justify-between border-b py-3">
      <span className="font-medium text-gray-500">
        Email Verification
      </span>

      <span className="text-green-600">
        Verified
      </span>
    </div>

 

  </div>
</section>

        {/* ================= NOTIFICATIONS ================= */}
        <section
          id="notifications"
          className="scroll-mt-20 py-20"
        >
          <h2 className="mb-10 text-center text-3xl font-bold">
            Notifications
          </h2>

          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-gray-500">
              Choose which email notifications you'd like to
              receive.
            </p>

            <div className="space-y-5">
              <label className="flex items-center justify-between">
                <span>Consultation Updates</span>
                <input type="checkbox" />
              </label>

              <label className="flex items-center justify-between">
                <span>Event Reminders</span>
                <input type="checkbox" />
              </label>

              <label className="flex items-center justify-between">
                <span>Announcements</span>
                <input type="checkbox" />
              </label>

              <label className="flex items-center justify-between">
                <span>Security Alerts</span>
                <input type="checkbox" />
              </label>
            </div>

            <div className="mt-8 text-center">
              <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}