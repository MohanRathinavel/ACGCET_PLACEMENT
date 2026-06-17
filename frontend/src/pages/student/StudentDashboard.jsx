import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  getStudentProfile,
  getStudentCompanies,
  getStudentApplications,
  getStudentInterviews,
  getStudentNotifications,
} from "../../api/api";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, companiesRes, appsRes, interviewsRes, notifRes] = await Promise.all([
          getStudentProfile(),
          getStudentCompanies(),
          getStudentApplications(),
          getStudentInterviews(),
          getStudentNotifications(),
        ]);
        setProfile(profileRes.data.data);
        setCompanies(companiesRes.data.data);
        setApplications(appsRes.data.data);
        setInterviews(interviewsRes.data.data);
        setNotifications(notifRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      }
    };
    load();
  }, []);

  const appliedCompanyIds = new Set(applications.map((a) => a.company?.companyId));
  const availableCompanies = companies.filter((c) => !appliedCompanyIds.has(c.companyId));
  const unreadNotifications = notifications.filter((n) => !n.readStatus);

  return (
    <div className="dashboard-shell">
      <Sidebar role="STUDENT" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Welcome, {profile?.firstName || "Student"}</h1>
            <p>Here's where your placement drive stands right now</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Available companies</div>
            <div className="stat-value">{availableCompanies.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Applications sent</div>
            <div className="stat-value">{applications.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Upcoming interviews</div>
            <div className="stat-value">{interviews.length}</div>
          </div>
          <div className="stat-card accent">
            <div className="stat-label">Unread notifications</div>
            <div className="stat-value">{unreadNotifications.length}</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Profile summary</div>
            {profile ? (
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Register No.</div>
                  <div className="value">{profile.registerNumber}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Department</div>
                  <div className="value">{profile.department || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">CGPA</div>
                  <div className="value">{profile.cgpa ?? "—"}</div>
                </div>
              </div>
            ) : (
              <p className="form-hint">Loading profile...</p>
            )}
            <Link to="/student/profile" className="btn btn-outline btn-sm" style={{ marginTop: "1rem" }}>
              View full profile
            </Link>
          </div>

          <div className="card">
            <div className="card-title">Recent notifications</div>
            {notifications.length === 0 ? (
              <p className="form-hint">No notifications yet.</p>
            ) : (
              notifications.slice(0, 4).map((n) => (
                <div
                  key={n.notificationId}
                  style={{ borderBottom: "1px solid var(--line)", padding: "0.6rem 0" }}
                >
                  <strong>{n.title}</strong>
                  <p className="form-hint">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Applied companies</div>
            {applications.length === 0 ? (
              <p className="form-hint">You haven't applied to any company yet.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 5).map((a) => (
                      <tr key={a.applicationId}>
                        <td>{a.company?.companyName}</td>
                        <td>
                          <span className={`badge badge-${a.status?.toLowerCase()}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">Upcoming interviews</div>
            {interviews.length === 0 ? (
              <p className="form-hint">No interviews scheduled yet.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Date</th>
                      <th>Round</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.slice(0, 5).map((iv) => (
                      <tr key={iv.interviewId}>
                        <td>{iv.company?.companyName}</td>
                        <td>{iv.interviewDate || "—"}</td>
                        <td>{iv.roundName || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
