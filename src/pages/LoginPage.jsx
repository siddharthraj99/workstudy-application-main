import { useState } from "react";
import { useApp } from "../context/AppContext";

function LoginPage() {
  const { login, USERS, setCurrentPage } = useApp();

  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!selectedId) {
      setError("Please select a user to continue.");
      return;
    }
    login(Number(selectedId));
  };

  const students = USERS.filter((u) => u.role === "student");
  const admins = USERS.filter((u) => u.role === "admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">WS</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            WorkStudy Portal
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            University Work-Study Management System
          </p>
        </div>

        {/* Role Select Info */}
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
          Select Account to Login
        </p>
{/* Admin Cards */}
<div className="mb-3">
  <p className="text-xs text-gray-400 mb-2 font-medium">
    Administrators
  </p>

  <div className="space-y-2">
    {admins.map((admin) => (
      <button
        key={admin.id}
        onClick={() => {
          setSelectedId(admin.id);
          setError("");
        }}
        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150
          ${
            selectedId === admin.id
              ? "border-blue-400 bg-blue-50"
              : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
          }`}
      >
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
          {admin.name.charAt(0)}
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            {admin.name}
          </p>
          <p className="text-xs text-gray-400">
            {admin.email}
          </p>
        </div>
      </button>
    ))}
  </div>
</div>

        {/* Student Cards */}
        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">Students</p>

          <div className="space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedId(student.id);
                  setError("");
                }}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150
                  ${
                    selectedId === student.id
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {student.email}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 mt-3 text-center">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all duration-150 active:scale-95"
        >
          Continue to Dashboard →
        </button>

        {/* Register Button */}
        <button
          onClick={() => setCurrentPage("register")}
          className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;