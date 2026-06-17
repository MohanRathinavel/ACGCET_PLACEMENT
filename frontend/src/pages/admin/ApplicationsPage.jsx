import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAllApplications, updateApplicationStatus } from "../../api/api";

const STATUS_OPTIONS = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "SELECTED",
  "REJECTED",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [editingApp, setEditingApp] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: "APPLIED", remarks: "" });

  const loadApplications = async () => {
    try {
      const res = await getAllApplications();
      setApplications(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications.");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const openStatusModal = (app) => {
    setEditingApp(app);
    setStatusForm({ status: app.status, remarks: app.remarks || "" });
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateApplicationStatus(editingApp.applicationId, statusForm);
      setSuccess("Application status updated.");
      setEditingApp(null);
      loadApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
    }
  };

  const filtered =
    filter === "ALL" ? applications : applications.filter((a) => a.status === filter);

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Placement applications</h1>
            <p>{applications.length} total applications</p>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "0.6rem 0.9rem", border: "1px solid var(--line)", borderRadius: "6px" }}
          >
            <option value="ALL">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <h3>No applications found</h3>
              <p>Applications will appear here once students start applying.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Register No.</th>
                    <th>Company</th>
                    <th>Applied on</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.applicationId}>
                      <td>{a.student?.firstName} {a.student?.lastName}</td>
                      <td>{a.student?.registerNumber}</td>
                      <td>{a.company?.companyName}</td>
                      <td>{a.appliedDate ? new Date(a.appliedDate).toLocaleDateString() : "—"}</td>
                      <td>
                        <span className={`badge badge-${a.status?.toLowerCase()}`}>
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => openStatusModal(a)}>
                          Update status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {editingApp && (
          <div className="modal-overlay" onClick={() => setEditingApp(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  {editingApp.student?.firstName} → {editingApp.company?.companyName}
                </h3>
                <button className="modal-close" onClick={() => setEditingApp(null)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleStatusSubmit}>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={statusForm.status}
                    onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Remarks (optional)</label>
                  <textarea
                    rows={3}
                    value={statusForm.remarks}
                    onChange={(e) => setStatusForm({ ...statusForm, remarks: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save status
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
