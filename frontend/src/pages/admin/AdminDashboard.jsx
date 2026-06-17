import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAdminDashboard, getAllApplications, getAllCompanies } from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [dashRes, companiesRes, appsRes] = await Promise.all([
          getAdminDashboard(),
          getAllCompanies(),
          getAllApplications(),
        ]);
        setStats(dashRes.data.data);
        setRecentCompanies(companiesRes.data.data.slice(-5).reverse());
        setRecentApplications(appsRes.data.data.slice(-5).reverse());
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Admin dashboard</h1>
            <p>Overview of the current placement drive</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total students</div>
            <div className="stat-value">{stats?.totalStudents ?? "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total companies</div>
            <div className="stat-value">{stats?.totalCompanies ?? "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total applications</div>
            <div className="stat-value">{stats?.totalApplications ?? "—"}</div>
          </div>
          <div className="stat-card accent">
            <div className="stat-label">Students placed</div>
            <div className="stat-value">{stats?.totalPlaced ?? "—"}</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Recently added companies</div>
            {recentCompanies.length === 0 ? (
              <p className="form-hint">No companies added yet.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Package</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCompanies.map((c) => (
                      <tr key={c.companyId}>
                        <td>{c.companyName}</td>
                        <td>{c.jobRole || "—"}</td>
                        <td>{c.packageLpa ? `${c.packageLpa} LPA` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-title">Recent applications</div>
            {recentApplications.length === 0 ? (
              <p className="form-hint">No applications yet.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Company</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((a) => (
                      <tr key={a.applicationId}>
                        <td>
                          {a.student?.firstName} {a.student?.lastName}
                        </td>
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
        </div>
      </main>
    </div>
  );
}
