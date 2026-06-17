import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  getAllInterviews,
  scheduleInterview,
  updateInterview,
  deleteInterview,
} from "../../api/api";

const emptyForm = {
  registerNumber: "",
  companyId: "",
  interviewDate: "",
  interviewTime: "",
  interviewMode: "ONLINE",
  meetingLink: "",
  venue: "",
  roundName: "",
  status: "SCHEDULED",
};

export default function InterviewSchedule() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadInterviews = async () => {
    try {
      const res = await getAllInterviews();
      setInterviews(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load interviews.");
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (interview) => {
    setForm({
      registerNumber: interview.student?.registerNumber || "",
      companyId: interview.company?.companyId || "",
      interviewDate: interview.interviewDate || "",
      interviewTime: interview.interviewTime || "",
      interviewMode: interview.interviewMode || "ONLINE",
      meetingLink: interview.meetingLink || "",
      venue: interview.venue || "",
      roundName: interview.roundName || "",
      status: interview.status || "SCHEDULED",
    });
    setEditingId(interview.interviewId);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form, companyId: Number(form.companyId) };
      if (editingId) {
        await updateInterview(editingId, payload);
        setSuccess("Interview updated.");
      } else {
        await scheduleInterview(payload);
        setSuccess("Interview scheduled.");
      }
      setShowForm(false);
      loadInterviews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save interview.");
    }
  };

  const handleDelete = async (interviewId) => {
    if (!window.confirm("Cancel and delete this interview?")) return;
    try {
      await deleteInterview(interviewId);
      setSuccess("Interview deleted.");
      loadInterviews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete interview.");
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Interview schedule</h1>
            <p>{interviews.length} interviews scheduled</p>
          </div>
          <button className="btn btn-primary" onClick={openNewForm}>
            + Schedule interview
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          {interviews.length === 0 ? (
            <div className="empty-state">
              <h3>No interviews scheduled</h3>
              <p>Schedule one using the button above.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Company</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Mode</th>
                    <th>Round</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((iv) => (
                    <tr key={iv.interviewId}>
                      <td>{iv.student?.firstName} {iv.student?.lastName}</td>
                      <td>{iv.company?.companyName}</td>
                      <td>{iv.interviewDate || "—"}</td>
                      <td>{iv.interviewTime || "—"}</td>
                      <td>{iv.interviewMode || "—"}</td>
                      <td>{iv.roundName || "—"}</td>
                      <td>
                        <span className="badge badge-default">{iv.status || "—"}</span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEditForm(iv)}>
                          Edit
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--red)" }}
                          onClick={() => handleDelete(iv.interviewId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingId ? "Edit interview" : "Schedule interview"}</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Student register number</label>
                    <input
                      name="registerNumber"
                      value={form.registerNumber}
                      onChange={handleChange}
                      required
                      disabled={!!editingId}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company ID</label>
                    <input
                      type="number"
                      name="companyId"
                      value={form.companyId}
                      onChange={handleChange}
                      required
                      disabled={!!editingId}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Interview date</label>
                    <input
                      type="date"
                      name="interviewDate"
                      value={form.interviewDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Interview time</label>
                    <input
                      type="time"
                      name="interviewTime"
                      value={form.interviewTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Mode</label>
                    <select name="interviewMode" value={form.interviewMode} onChange={handleChange}>
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Round name</label>
                    <input
                      name="roundName"
                      value={form.roundName}
                      onChange={handleChange}
                      placeholder="e.g. Technical Round 1"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Meeting link</label>
                    <input name="meetingLink" value={form.meetingLink} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Venue</label>
                    <input name="venue" value={form.venue} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="SCHEDULED, COMPLETED, CANCELLED..."
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  {editingId ? "Save changes" : "Schedule interview"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
