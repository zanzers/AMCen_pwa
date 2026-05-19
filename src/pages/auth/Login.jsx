import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../api/api";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

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

      // Save session
      localStorage.setItem(
        "amcen_user",
        JSON.stringify(data)
      );

      // Redirect
      navigate("/upload");

    } catch(err){

      console.error(err);
      alert("Login failed");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        />

        <button
          onClick={loginUser}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );

}