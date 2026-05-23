

export default function LoginUI({change, login}){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={change}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={change}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
    );
}