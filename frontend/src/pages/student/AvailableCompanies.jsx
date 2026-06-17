import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getStudentCompanies, getStudentApplications, applyToCompany } from "../../api/api";

export default function AvailableCompanies() {
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [applyingId, setApplyingId] = useState(null);

  const loadData = async () => {
    try {
      const [companiesRes, appsRes] = await Promise.all([
        getStudentCompanies(),
        getStudentApplications(),
      ]);
      setCompanies(companiesRes.data.data);
      setApplications(appsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load companies.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const appliedCompanyIds = new Set(applications.map((a) => a.company?.companyId));

  const handleApply = async (companyId) => {
    setError("");
    setSuccess("");
    setApplyingId(companyId);
    try {
      await applyToCompany(companyId);
      setSuccess("Application submitted successfully.");
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply. Check eligibility criteria.");
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar role="STUDENT" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Available companies</h1>
            <p>{companies.length} companies currently recruiting</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {companies.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <h3>No companies posted yet</h3>
              <p>Check back once the placement cell adds new openings.</p>
            </div>
          </div>
        ) : (
          <div className="company-card-grid">
            {companies.map((c) => {
              const alreadyApplied = appliedCompanyIds.has(c.companyId);
              return (
                <div className="company-card" key={c.companyId}>
                  <div className="company-card-header">
                    <div>
                      <h3>{c.companyName}</h3>
                      <div className="company-type">{c.companyType || "General"}</div>
                    </div>
                    {c.packageLpa && (
                      <span className="package-tag">{c.packageLpa} LPA</span>
                    )}
                  </div>
                  <p className="desc">{c.description || "No description provided."}</p>
                  <div className="company-meta">
                    {c.jobRole && <span className="meta-chip">{c.jobRole}</span>}
                    {c.requiredDepartment && (
                      <span className="meta-chip">{c.requiredDepartment}</span>
                    )}
                    {c.minimumCgpa && <span className="meta-chip">Min CGPA {c.minimumCgpa}</span>}
                    {c.location && <span className="meta-chip">{c.location}</span>}
                  </div>
                  {c.lastDateToApply && (
                    <p className="form-hint" style={{ marginBottom: "0.6rem" }}>
                      Apply before {c.lastDateToApply}
                    </p>
                  )}
                  <button
                    className="btn btn-primary btn-sm btn-block"
                    disabled={alreadyApplied || applyingId === c.companyId}
                    onClick={() => handleApply(c.companyId)}
                  >
                    {alreadyApplied
                      ? "Already applied"
                      : applyingId === c.companyId
                      ? "Applying..."
                      : "Apply now"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
