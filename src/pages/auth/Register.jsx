import { useState } from "react";
import { API_URL } from "../../api/api";

export default function Register() {

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const registerUser = async () => {

    try {

      const res = await fetch(
        API_URL,
        {
          method: "POST",
          body: JSON.stringify({
            action: "registerUser",
            ...form,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      alert(JSON.stringify(data));

    } catch(err) {
      console.error(err);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-96 space-y-4">

        <h1 className="text-3xl font-bold">
          Register
        </h1>

        <input
          name="firstName"
          placeholder="First Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="middleName"
          placeholder="Middle Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        
        <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

        <button
          onClick={registerUser}
          className="w-full bg-black text-white p-2 rounded"
        >
          Register
        </button>

      </div>

    </div>
  );

}