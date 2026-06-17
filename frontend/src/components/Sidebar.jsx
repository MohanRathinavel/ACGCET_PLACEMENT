import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/students", label: "Students" },
  { to: "/admin/companies", label: "Companies" },
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/interviews", label: "Interviews" },
  { to: "/admin/notifications", label: "Notifications" },
  { to: "/admin/results", label: "Placement Results" },
];

const STUDENT_LINKS = [
  { to: "/student/dashboard", label: "Dashboard" },
  { to: "/student/profile", label: "My Profile" },
  { to: "/student/companies", label: "Available Companies" },
  { to: "/student/applications", label: "My Applications" },
  { to: "/student/interviews", label: "Interview Schedule" },
];

export default function Sidebar({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = role === "ADMIN" ? ADMIN_LINKS : STUDENT_LINKS;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Place<span>Hub</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="name">{user?.username}</div>
          <div className="role">{user?.role}</div>
        </div>
        <button className="btn btn-outline btn-sm btn-block" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}
