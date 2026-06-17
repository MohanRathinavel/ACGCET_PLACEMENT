import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getAllStudents, deleteStudent, updateStudentByAdmin } from "../../api/api";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState({});

  const loadStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students.");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (registerNumber) => {
    if (!window.confirm(`Delete student ${registerNumber}? This cannot be undone.`)) return;
    try {
      await deleteStudent(registerNumber);
      setSuccess("Student deleted.");
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student.");
    }
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    setEditForm({
      department: student.department || "",
      academicYear: student.academicYear || "",
      cgpa: student.cgpa || "",
      historyOfArrears: student.historyOfArrears || false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudentByAdmin(editingStudent.registerNumber, {
        ...editForm,
        cgpa: editForm.cgpa ? Number(editForm.cgpa) : null,
      });
      setSuccess("Student updated.");
      setEditingStudent(null);
      loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student.");
    }
  };

  const filtered = students.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.firstName?.toLowerCase().includes(term) ||
      s.lastName?.toLowerCase().includes(term) ||
      s.registerNumber?.toLowerCase().includes(term) ||
      s.department?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-shell">
      <Sidebar role="ADMIN" />
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Manage students</h1>
            <p>{students.length} registered students</p>
          </div>
          <input
            type="text"
            placeholder="Search by name, register no., department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 320, padding: "0.6rem 0.9rem", border: "1px solid var(--line)", borderRadius: "6px" }}
          />
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <h3>No students found</h3>
              <p>Try a different search term.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Register No.</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>CGPA</th>
                    <th>Arrears</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.registerNumber}>
                      <td>{s.registerNumber}</td>
                      <td>{s.firstName} {s.lastName}</td>
                      <td>{s.department || "—"}</td>
                      <td>{s.cgpa ?? "—"}</td>
                      <td>{s.historyOfArrears ? "Yes" : "No"}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>
                          Edit
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ color: "var(--red)" }}
                          onClick={() => handleDelete(s.registerNumber)}
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

        {editingStudent && (
          <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Edit {editingStudent.firstName} {editingStudent.lastName}</h3>
                <button className="modal-close" onClick={() => setEditingStudent(null)}>
                  ×
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Academic year</label>
                  <input
                    name="academicYear"
                    value={editForm.academicYear}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    value={editForm.cgpa}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      type="checkbox"
                      name="historyOfArrears"
                      checked={editForm.historyOfArrears}
                      onChange={handleEditChange}
                      style={{ width: "auto" }}
                    />
                    History of arrears
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
