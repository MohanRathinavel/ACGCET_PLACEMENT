import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupStudent } from "../api/api";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  registerNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  phoneNumber: "",
  department: "",
  academicYear: "",
  passedOutYear: "",
  cgpa: "",
  gender: "",
  dateOfBirth: "",
  nativePlace: "",
  historyOfArrears: false,
  fatherName: "",
  motherName: "",
  fatherOccupation: "",
  motherOccupation: "",
  parentPhoneNumber: "",
};

export default function SignupPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    const payload = {
      ...form,
      passedOutYear: form.passedOutYear ? Number(form.passedOutYear) : null,
      cgpa: form.cgpa ? Number(form.cgpa) : null,
    };

    try {
      const response = await signupStudent(payload);
      const authData = response.data.data;
      login(authData);
      navigate("/student/dashboard");
    } catch (err) {
      const data = err.response?.data;
      if (data?.data && typeof data.data === "object") {
        setFieldErrors(data.data);
        setError("Please fix the highlighted fields.");
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-logo">
          Place<span>Hub</span>
        </div>
        <h2>Student registration</h2>
        <p className="auth-subtitle">
          Fill in your details to create your placement profile
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section-title">Account details</div>
          <div className="form-row">
            <div className="form-group">
              <label>Register number</label>
              <input
                name="registerNumber"
                value={form.registerNumber}
                onChange={handleChange}
                required
              />
              {fieldErrors.registerNumber && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.registerNumber}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={form.username} onChange={handleChange} required />
              {fieldErrors.username && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.username}
                </p>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.password}
                </p>
              )}
            </div>
          </div>

          <div className="form-section-title">Personal details</div>
          <div className="form-row">
            <div className="form-group">
              <label>First name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone number</label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="10 digit number"
              />
              {fieldErrors.phoneNumber && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.phoneNumber}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
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
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Native place</label>
              <input name="nativePlace" value={form.nativePlace} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section-title">Academic details</div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <input name="department" value={form.department} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Academic year</label>
              <input
                name="academicYear"
                value={form.academicYear}
                onChange={handleChange}
                placeholder="e.g. 3rd Year"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Passed-out year</label>
              <input
                type="number"
                name="passedOutYear"
                value={form.passedOutYear}
                onChange={handleChange}
                placeholder="e.g. 2026"
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
                value={form.cgpa}
                onChange={handleChange}
              />
              {fieldErrors.cgpa && (
                <p className="form-hint" style={{ color: "var(--red)" }}>
                  {fieldErrors.cgpa}
                </p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                name="historyOfArrears"
                checked={form.historyOfArrears}
                onChange={handleChange}
                style={{ width: "auto" }}
              />
              I have a history of arrears
            </label>
          </div>

          <div className="form-section-title">Parent / guardian details</div>
          <div className="form-row">
            <div className="form-group">
              <label>Father's name</label>
              <input name="fatherName" value={form.fatherName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mother's name</label>
              <input name="motherName" value={form.motherName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Father's occupation</label>
              <input
                name="fatherOccupation"
                value={form.fatherOccupation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Mother's occupation</label>
              <input
                name="motherOccupation"
                value={form.motherOccupation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Parent phone number</label>
            <input
              name="parentPhoneNumber"
              value={form.parentPhoneNumber}
              onChange={handleChange}
              placeholder="10 digit number"
            />
            {fieldErrors.parentPhoneNumber && (
              <p className="form-hint" style={{ color: "var(--red)" }}>
                {fieldErrors.parentPhoneNumber}
              </p>
            )}
          </div>

          <p className="form-hint" style={{ marginBottom: "1rem" }}>
            Resume and profile photo can be uploaded after your account is
            created, from your profile page.
          </p>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
