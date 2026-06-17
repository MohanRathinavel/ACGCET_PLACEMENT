import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { addCompany } from "../../api/api";

const initialForm = {
  companyName: "",
  companyType: "",
  description: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  requiredDepartment: "",
  minimumCgpa: "",
  allowArrears: false,
  packageLpa: "",
  jobRole: "",
  skillsRequired: "",
  lastDateToApply: "",
  logoUrl: "",
};

export default function AddCompany() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await addCompany({
        ...form,
        minimumCgpa: form.minimumCgpa ? Number(form.minimumCgpa) : null,
        packageLpa: form.packageLpa ? Number(form.packageLpa) : null,
        lastDateToApply: form.lastDateToApply || null,
      });
      navigate("/admin/companies");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add company.");
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
            <h1>Add company</h1>
            <p>Post a new recruiter and its eligibility criteria</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card" style={{ maxWidth: 760 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Company name</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Company type</label>
                <input
                  name="companyType"
                  value={form.companyType}
                  onChange={handleChange}
                  placeholder="e.g. IT Services, Product"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Website</label>
                <input name="website" value={form.website} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section-title">Eligibility criteria</div>
            <div className="form-row">
              <div className="form-group">
                <label>Required department</label>
                <input
                  name="requiredDepartment"
                  value={form.requiredDepartment}
                  onChange={handleChange}
                  placeholder="e.g. CSE or ALL"
                />
              </div>
              <div className="form-group">
                <label>Minimum CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  name="minimumCgpa"
                  value={form.minimumCgpa}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  name="allowArrears"
                  checked={form.allowArrears}
                  onChange={handleChange}
                  style={{ width: "auto" }}
                />
                Allow students with history of arrears
              </label>
            </div>

            <div className="form-section-title">Role details</div>
            <div className="form-row">
              <div className="form-group">
                <label>Job role</label>
                <input name="jobRole" value={form.jobRole} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Package (LPA)</label>
                <input
                  type="number"
                  step="0.1"
                  name="packageLpa"
                  value={form.packageLpa}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Skills required</label>
              <input
                name="skillsRequired"
                value={form.skillsRequired}
                onChange={handleChange}
                placeholder="Comma-separated, e.g. Java, SQL, REST APIs"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Last date to apply</label>
                <input
                  type="date"
                  name="lastDateToApply"
                  value={form.lastDateToApply}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Logo URL</label>
                <input name="logoUrl" value={form.logoUrl} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add company"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
