import { useState } from "react";

import Profile_Name from "./ProfileName";
import Profile_Image from "./ProfileImage";
import Profile_Describe from "./ProfileDescribe";
import ProfileComplete from "./ProfileComplete";

import { API_URL  } from "../../api/api";

export default function Profile_setup() {

  const [step, setStep ] = useState(1);
  const [profile, setProfile] = useState({
    fullName: "",
    profileImgId: "",
    usageType: "",}
  )
const finishProfile = async() => {

  try {

    const user = JSON.parse(
      localStorage.getItem("amcen_user")
    );

    let profileImgId = profile.profileImgId;

    // UPLOAD IMAGE FIRST
    if(profile.profileImgId?.type === "uploaded"){

      const uploadedRes = await fetch(
        API_URL,
        {
          method:"POST",
          body:JSON.stringify({
            action:"uploadProfileImage",
            userId:user.user.userId,
            image:profile.profileImgId.image
          })
        }
      );

      console.log(
        "user",
        user.user.userId
      );

      const uploadedData = await uploadedRes.json();

      console.log(uploadedData);

      profileImgId = uploadedData.profileImgId;

    }

    // UPDATE PROFILE
    const res = await fetch(
      API_URL,
      {
        method:"POST",
        body:JSON.stringify({
          action:"updateProfile",

          userId:user.user.userId,

          fullName:profile.fullName,

          profileImgId:profileImgId,

          usageType:profile.usageType,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if(data.success){

      setStep(4);

    }

  } catch(err){

    console.error(err);

  }

};
  
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
            <Profile_Describe user={profile} setProfile={setProfile} step={setStep} complete={finishProfile}/>
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