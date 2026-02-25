import { useState } from "react";
import { useApp } from "../context/AppContext";

function RegisterPage() {
  const { registerUser, setCurrentPage } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    registerUser(name, email, role);
    alert("User Registered Successfully!");

    setName("");
    setEmail("");

    setCurrentPage("login"); // go back to login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Register New User
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Register
        </button>

        <button
          onClick={() => setCurrentPage("login")}
          className="w-full mt-3 text-sm text-gray-500"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;