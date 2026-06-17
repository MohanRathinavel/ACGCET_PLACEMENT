import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getStudentInterviews } from "../../api/api";

export default function StudentInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudentInterviews();
        setInterviews(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load interview schedule.");
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
            <h1>Interview schedule</h1>
            <p>{interviews.length} interviews scheduled for you</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {interviews.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <h3>No interviews scheduled</h3>
              <p>You'll see your interview details here once the placement cell schedules one.</p>
            </div>
          </div>
        ) : (
          <div className="grid-2">
            {interviews.map((iv) => (
              <div className="card" key={iv.interviewId}>
                <div className="card-title">{iv.company?.companyName}</div>
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="label">Round</div>
                    <div className="value">{iv.roundName || "—"}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Date</div>
                    <div className="value">{iv.interviewDate || "—"}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Time</div>
                    <div className="value">{iv.interviewTime || "—"}</div>
                  </div>
                  <div className="detail-item">
                    <div className="label">Mode</div>
                    <div className="value">{iv.interviewMode || "—"}</div>
                  </div>
                </div>
                {iv.interviewMode === "ONLINE" && iv.meetingLink && (
                  <p className="form-hint" style={{ marginTop: "0.8rem" }}>
                    Meeting link:{" "}
                    <a href={iv.meetingLink} target="_blank" rel="noreferrer">
                      {iv.meetingLink}
                    </a>
                  </p>
                )}
                {iv.venue && (
                  <p className="form-hint" style={{ marginTop: "0.8rem" }}>
                    Venue: {iv.venue}
                  </p>
                )}
                <p style={{ marginTop: "0.8rem" }}>
                  <span className="badge badge-default">{iv.status || "SCHEDULED"}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
