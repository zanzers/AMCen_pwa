import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../api/api";
import LoginUI from "../auth/LoginUI";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value,});
  };


  const loginUser = async () => {

    try {

      const res = await fetch(
        API_URL,
        {
          method: "POST",
          body: JSON.stringify({
            action: "loginUser",
            ...form,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if(!data.success){

        alert(data.message);
        return;

      }

      localStorage.setItem(
        "amcen_user",
        JSON.stringify(data)
      );

      data.user.profileImgId ? navigate("/user/dashboard") : navigate("/user/profile-setup");

    } catch(err){

      console.error(err);
      alert("Login failed");

    }

  };

  return (
    <LoginUI  change={handleChange} login={loginUser}/>
  );

}