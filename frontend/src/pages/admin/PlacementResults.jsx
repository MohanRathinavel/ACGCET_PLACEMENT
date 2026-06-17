import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAllResults, addPlacementResult } from "../../api/api";

const emptyForm = {
  registerNumber: "",
  companyId: "",
  packageLpa: "",
  role: "",
  selectedDate: "",
};

export default function PlacementResults() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadResults = async () => {
    try {
      const res = await getAllResults();
      setResults(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load placement results.");
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addPlacementResult({
        ...form,
        companyId: Number(form.companyId),
        packageLpa: Number(form.packageLpa),
      });
      setSuccess("Placement result recorded.");
      setShowForm(false);
      setForm(emptyForm);
      loadResults();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to record result.");
    }
  };

  const totalPackage = results.reduce((sum, r) => sum + (r.packageLpa || 0), 0);
  const avgPackage = results.length ? (totalPackage / results.length).toFixed(2) : 0;
  const highestPackage = results.length
    ? Math.max(...results.map((r) => r.packageLpa || 0))
    : 0;

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Placement results</h1>
            <p>{results.length} students placed so far</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Record result
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total placed</div>
            <div className="stat-value">{results.length}</div>
          </div>
          <div className="stat-card accent">
            <div className="stat-label">Highest package</div>
            <div className="stat-value">{highestPackage} LPA</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average package</div>
            <div className="stat-value">{avgPackage} LPA</div>
          </div>
        </div>

        <div className="card">
          {results.length === 0 ? (
            <div className="empty-state">
              <h3>No results recorded yet</h3>
              <p>Record a placement once a student is selected.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Register No.</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Package</th>
                    <th>Selected on</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.resultId}>
                      <td>{r.student?.firstName} {r.student?.lastName}</td>
                      <td>{r.student?.registerNumber}</td>
                      <td>{r.company?.companyName}</td>
                      <td>{r.role}</td>
                      <td>{r.packageLpa} LPA</td>
                      <td>{r.selectedDate || "—"}</td>
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
                <h3>Record placement result</h3>
                <button className="modal-close" onClick={() => setShowForm(false)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Student register number</label>
                  <input
                    name="registerNumber"
                    value={form.registerNumber}
                    onChange={handleChange}
                    required
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
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role / designation</label>
                    <input name="role" value={form.role} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Package (LPA)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="packageLpa"
                      value={form.packageLpa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Selected date</label>
                  <input
                    type="date"
                    name="selectedDate"
                    value={form.selectedDate}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save result
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
