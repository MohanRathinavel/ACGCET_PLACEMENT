import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every outgoing request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------------- Auth ----------------
export const loginUser = (data) => api.post("/auth/login", data);
export const signupStudent = (data) => api.post("/auth/student/signup", data);
export const getCurrentUser = () => api.get("/auth/me");

// ---------------- Admin ----------------
export const getAdminDashboard = () => api.get("/admin/dashboard");
export const getAllStudents = () => api.get("/admin/students");
export const getStudentByRegNo = (regNo) => api.get(`/admin/students/${regNo}`);
export const updateStudentByAdmin = (regNo, data) => api.put(`/admin/students/${regNo}`, data);
export const deleteStudent = (regNo) => api.delete(`/admin/students/${regNo}`);

// ---------------- Student ----------------
export const getStudentProfile = () => api.get("/students/profile");
export const updateStudentProfile = (data) => api.put("/students/profile", data);
export const uploadResume = (formData) =>
  api.post("/students/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const uploadProfileImage = (formData) =>
  api.post("/students/profile-image/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getStudentCompanies = () => api.get("/students/companies");
export const applyToCompany = (companyId) => api.post(`/students/apply/${companyId}`);
export const getStudentApplications = () => api.get("/students/applications");
export const getStudentInterviews = () => api.get("/students/interviews");
export const getStudentNotifications = () => api.get("/students/notifications");

// ---------------- Companies ----------------
export const getAllCompanies = () => api.get("/companies");
export const getCompanyById = (id) => api.get(`/companies/${id}`);
export const addCompany = (data) => api.post("/companies", data);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);
export const getCompaniesByType = (type) => api.get(`/companies/type/${type}`);

// ---------------- Applications ----------------
export const getAllApplications = () => api.get("/applications/admin");
export const updateApplicationStatus = (id, data) =>
  api.put(`/applications/${id}/status`, data);

// ---------------- Interviews ----------------
export const getAllInterviews = () => api.get("/interviews/admin");
export const scheduleInterview = (data) => api.post("/interviews", data);
export const updateInterview = (id, data) => api.put(`/interviews/${id}`, data);
export const deleteInterview = (id) => api.delete(`/interviews/${id}`);

// ---------------- Notifications ----------------
export const sendNotification = (data) => api.post("/notifications", data);
export const markNotificationRead = (id) => api.put(`/notifications/${id}/read`);

// ---------------- Placement Results ----------------
export const addPlacementResult = (data) => api.post("/results", data);
export const getAllResults = () => api.get("/results");
export const getResultByRegNo = (regNo) => api.get(`/results/student/${regNo}`);

export default api;
