import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getAllCompanies, deleteCompany } from "../../api/api";

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCompanies = async () => {
    try {
      const res = await getAllCompanies();
      setCompanies(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load companies.");
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleDelete = async (companyId, name) => {
    if (!window.confirm(`Delete ${name}? This will also remove related applications.`)) return;
    try {
      await deleteCompany(companyId);
      setSuccess("Company deleted.");
      loadCompanies();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete company.");
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Manage companies</h1>
            <p>{companies.length} companies on the platform</p>
          </div>
          <Link to="/admin/companies/add" className="btn btn-primary">
            + Add company
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          {companies.length === 0 ? (
            <div className="empty-state">
              <h3>No companies yet</h3>
              <p>Add your first recruiter to get started.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Role</th>
                    <th>Package</th>
                    <th>Min. CGPA</th>
                    <th>Last date to apply</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c) => (
                    <tr key={c.companyId}>
                      <td>{c.companyName}</td>
                      <td>{c.companyType || "—"}</td>
                      <td>{c.jobRole || "—"}</td>
                      <td>{c.packageLpa ? `${c.packageLpa} LPA` : "—"}</td>
                      <td>{c.minimumCgpa ?? "—"}</td>
                      <td>{c.lastDateToApply || "—"}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--red)" }}
                          onClick={() => handleDelete(c.companyId, c.companyName)}
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
      </main>
    </div>
  );
}
