import { useState } from "react";

import Profile_Name from "../mini_pages/Profile_name";
import Profile_Image from "../mini_pages/Profile_Image";
import Profile_Describe from "../mini_pages/Profile_describe";
import ProfileComplete from "../mini_pages/Profile_finish";


export default function Profile_setup() {

  const [step, setStep ] = useState(1);
  const [profile, setProfile] = useState({
    fullName: "",
    profileImage: null,
    usageType: "",}
  )

  
  return (

    <section>
         <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6">

      {
        step == 1 && (
            <Profile_Name user={profile} userProfile={setProfile} step={setStep}/>
        )
      }
      {
        step == 2 && (
            <Profile_Image user={profile} userProfile={setProfile} step={setStep}/>
        )
      }

      {
        step == 3 && (
            <Profile_Describe user={profile} setProfile={setProfile} step={setStep}/>
        )
      }
      {
        step == 4 && (
            <ProfileComplete />
        )
      }



    </div>
    </section>

  );

}