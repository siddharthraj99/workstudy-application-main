import { useApp } from "./context/AppContext";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import JobList from "./pages/JobList";
import Applications from "./pages/Applications";
import WorkHours from "./pages/WorkHours";
import Feedback from "./pages/Feedback";

// Layout
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function PageRouter() {
  const { currentPage, user } = useApp();

  if (currentPage === "dashboard") {
    return user?.role === "admin"
      ? <AdminDashboard />
      : <StudentDashboard />;
  }

  if (currentPage === "jobs") return <JobList />;
  if (currentPage === "applications") return <Applications />;
  if (currentPage === "hours") return <WorkHours />;
  if (currentPage === "feedback") return <Feedback />;

  return null;
}

function App() {
  const { user, currentPage } = useApp();

  // 🔥 NOT LOGGED IN
  if (!user) {
    if (currentPage === "register") {
      return <RegisterPage />;
    }
    return <LoginPage />;
  }

  // 🔥 LOGGED IN
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <PageRouter />
        </main>
      </div>
    </div>
  );
}

export default App;