import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_WORK_LOGS,
  USERS as INITIAL_USERS,
} from "../data/mockData";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {

  // 🔥 Persist Users in localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });

  // 🔥 Persist Logged-in User
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [workLogs, setWorkLogs] = useState(INITIAL_WORK_LOGS);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // ───────── Persist Users ─────────
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ───────── Persist Logged-in User ─────────
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [user]);

  // ───────── AUTH ─────────
  const login = (userId) => {
    const foundUser = users.find((u) => u.id === userId);
    setUser(foundUser);
    setCurrentPage("dashboard");
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  const registerUser = (name, email, role) => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
    };

    setUsers((prev) => [...prev, newUser]);
  };

  // ───────── JOBS ─────────
  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Date.now(),
      postedDate: new Date().toISOString().slice(0, 10),
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  // ───────── APPLICATIONS ─────────
  const applyForJob = (jobId) => {
    const alreadyApplied = applications.find(
      (a) => a.studentId === user.id && a.jobId === jobId
    );

    if (alreadyApplied) {
      return { success: false, message: "You already applied for this job." };
    }

    const job = jobs.find((j) => j.id === jobId);

    const newApp = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      jobId,
      jobTitle: job.title,
      status: "pending",
      appliedDate: new Date().toISOString().slice(0, 10),
      feedback: "",
    };

    setApplications((prev) => [newApp, ...prev]);

    return { success: true, message: "Application submitted successfully!" };
  };

  const updateApplication = (appId, status, feedback = "") => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId ? { ...a, status, feedback } : a
      )
    );
  };

  // ───────── WORK LOGS ─────────
  const logHours = (logData) => {
    const newLog = {
      id: Date.now(),
      studentId: user.id,
      studentName: user.name,
      ...logData,
      hours: Number(logData.hours),
    };

    setWorkLogs((prev) => [newLog, ...prev]);
  };

  // ───────── HELPERS ─────────
  const getStudentApplications = (studentId) =>
    applications.filter((a) => a.studentId === studentId);

  const getStudentWorkLogs = (studentId) =>
    workLogs.filter((w) => w.studentId === studentId);

  const getTotalHours = (studentId) =>
    workLogs
      .filter((w) => w.studentId === studentId)
      .reduce((sum, w) => sum + w.hours, 0);

  const value = {
    user,
    users,
    login,
    logout,
    registerUser,
    jobs,
    addJob,
    applications,
    applyForJob,
    updateApplication,
    workLogs,
    logHours,
    currentPage,
    setCurrentPage,
    getStudentApplications,
    getStudentWorkLogs,
    getTotalHours,
    USERS: users,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}