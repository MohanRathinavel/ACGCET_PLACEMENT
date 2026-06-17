import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getStudentApplications } from "../../api/api";

export default function StudentApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudentApplications();
        setApplications(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications.");
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar role="STUDENT" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>My applications</h1>
            <p>{applications.length} companies applied to</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          {applications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications yet</h3>
              <p>Browse available companies and apply to get started.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Package</th>
                    <th>Applied on</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((a) => (
                    <tr key={a.applicationId}>
                      <td>{a.company?.companyName}</td>
                      <td>{a.company?.jobRole || "—"}</td>
                      <td>{a.company?.packageLpa ? `${a.company.packageLpa} LPA` : "—"}</td>
                      <td>{a.appliedDate ? new Date(a.appliedDate).toLocaleDateString() : "—"}</td>
                      <td>
                        <span className={`badge badge-${a.status?.toLowerCase()}`}>
                          {a.status}
                        </span>
                      </td>
                      <td>{a.remarks || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
