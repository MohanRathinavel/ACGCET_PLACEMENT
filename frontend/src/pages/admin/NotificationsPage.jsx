import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { sendNotification } from "../../api/api";

export default function NotificationsPage() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    targetRole: "STUDENT",
    registerNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentList, setSentList] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        message: form.message,
        targetRole: form.targetRole,
        registerNumber: form.registerNumber || null,
      };
      const res = await sendNotification(payload);
      setSentList((prev) => [res.data.data, ...prev]);
      setSuccess("Notification sent.");
      setForm({ title: "", message: "", targetRole: "STUDENT", registerNumber: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Notifications</h1>
            <p>Send announcements to students</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="grid-2">
          <div className="card">
            <div className="card-title">Compose notification</div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Target a specific student (optional — leave blank to notify all students)
                </label>
                <input
                  name="registerNumber"
                  value={form.registerNumber}
                  onChange={handleChange}
                  placeholder="Register number"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send notification"}
              </button>
            </form>
          </div>

          <div className="card">
            <div className="card-title">Recently sent (this session)</div>
            {sentList.length === 0 ? (
              <div className="empty-state">
                <h3>Nothing sent yet</h3>
                <p>Notifications you send will appear here.</p>
              </div>
            ) : (
              sentList.map((n, idx) => (
                <div
                  key={n.notificationId || idx}
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "0.8rem 0",
                  }}
                >
                  <strong>{n.title}</strong>
                  <p className="form-hint">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
