import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getStudentProfile, updateStudentProfile, uploadResume } from "../../api/api";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await getStudentProfile();
      setProfile(res.data.data);
      setForm(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await updateStudentProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        department: form.department,
        academicYear: form.academicYear,
        passedOutYear: form.passedOutYear,
        cgpa: form.cgpa,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        nativePlace: form.nativePlace,
        historyOfArrears: form.historyOfArrears,
        fatherName: form.fatherName,
        motherName: form.motherName,
        fatherOccupation: form.fatherOccupation,
        motherOccupation: form.motherOccupation,
        parentPhoneNumber: form.parentPhoneNumber,
      });
      setProfile(res.data.data);
      setSuccess("Profile updated.");
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      await uploadResume(formData);
      setSuccess("Resume uploaded.");
      setResumeFile(null);
      loadProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  if (!profile) {
    return (
      <div className="dashboard-shell">
        <Sidebar role="STUDENT" />
        <main className="main-content">
          <p className="form-hint">Loading profile...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <Sidebar role="STUDENT" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>My profile</h1>
            <p>Keep your details current so recruiters see accurate information</p>
          </div>
          {!editing && (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit profile
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="profile-header">
          <div className="profile-avatar">
            {profile.firstName?.[0]?.toUpperCase()}
            {profile.lastName?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{profile.registerNumber} • {profile.department}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="card">
              <div className="card-title">Academic details</div>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Department</div>
                  <div className="value">{profile.department || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Academic year</div>
                  <div className="value">{profile.academicYear || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Passed-out year</div>
                  <div className="value">{profile.passedOutYear || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">CGPA</div>
                  <div className="value">{profile.cgpa ?? "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">History of arrears</div>
                  <div className="value">{profile.historyOfArrears ? "Yes" : "No"}</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Personal details</div>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Phone</div>
                  <div className="value">{profile.phoneNumber || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Gender</div>
                  <div className="value">{profile.gender || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Date of birth</div>
                  <div className="value">{profile.dateOfBirth || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Native place</div>
                  <div className="value">{profile.nativePlace || "—"}</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Parent / guardian details</div>
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Father's name</div>
                  <div className="value">{profile.fatherName || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Mother's name</div>
                  <div className="value">{profile.motherName || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Father's occupation</div>
                  <div className="value">{profile.fatherOccupation || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Mother's occupation</div>
                  <div className="value">{profile.motherOccupation || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Parent phone</div>
                  <div className="value">{profile.parentPhoneNumber || "—"}</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Resume</div>
              {profile.resumeUrl ? (
                <p className="form-hint">
                  Current resume: <a href={`http://localhost:8080${profile.resumeUrl}`} target="_blank" rel="noreferrer">view file</a>
                </p>
              ) : (
                <p className="form-hint">No resume uploaded yet.</p>
              )}
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.8rem", alignItems: "center" }}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleResumeUpload}
                  disabled={!resumeFile || uploading}
                >
                  {uploading ? "Uploading..." : "Upload resume"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="card">
            <form onSubmit={handleSave}>
              <div className="form-section-title">Personal details</div>
              <div className="form-row">
                <div className="form-group">
                  <label>First name</label>
                  <input name="firstName" value={form.firstName || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input name="lastName" value={form.lastName || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone number</label>
                  <input name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={form.gender || ""} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Native place</label>
                  <input name="nativePlace" value={form.nativePlace || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="form-section-title">Academic details</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <input name="department" value={form.department || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Academic year</label>
                  <input name="academicYear" value={form.academicYear || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Passed-out year</label>
                  <input
                    type="number"
                    name="passedOutYear"
                    value={form.passedOutYear || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    value={form.cgpa || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    name="historyOfArrears"
                    checked={form.historyOfArrears || false}
                    onChange={handleChange}
                    style={{ width: "auto" }}
                  />
                  History of arrears
                </label>
              </div>

              <div className="form-section-title">Parent / guardian details</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Father's name</label>
                  <input name="fatherName" value={form.fatherName || ""} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mother's name</label>
                  <input name="motherName" value={form.motherName || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Father's occupation</label>
                  <input
                    name="fatherOccupation"
                    value={form.fatherOccupation || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Mother's occupation</label>
                  <input
                    name="motherOccupation"
                    value={form.motherOccupation || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Parent phone number</label>
                <input
                  name="parentPhoneNumber"
                  value={form.parentPhoneNumber || ""}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setForm(profile);
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
