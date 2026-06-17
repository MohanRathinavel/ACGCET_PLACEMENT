import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageCompanies from "./pages/admin/ManageCompanies";
import AddCompany from "./pages/admin/AddCompany";
import ApplicationsPage from "./pages/admin/ApplicationsPage";
import InterviewSchedule from "./pages/admin/InterviewSchedule";
import NotificationsPage from "./pages/admin/NotificationsPage";
import PlacementResults from "./pages/admin/PlacementResults";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import AvailableCompanies from "./pages/student/AvailableCompanies";
import StudentApplications from "./pages/student/StudentApplications";
import StudentInterviews from "./pages/student/StudentInterviews";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/companies"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageCompanies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/companies/add"
        element={
          <ProtectedRoute role="ADMIN">
            <AddCompany />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/applications"
        element={
          <ProtectedRoute role="ADMIN">
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/interviews"
        element={
          <ProtectedRoute role="ADMIN">
            <InterviewSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute role="ADMIN">
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/results"
        element={
          <ProtectedRoute role="ADMIN">
            <PlacementResults />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/companies"
        element={
          <ProtectedRoute role="STUDENT">
            <AvailableCompanies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/interviews"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentInterviews />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
