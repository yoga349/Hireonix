export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/user/profile",
    DELETE_RESUME: "/api/user/resume",
  },

  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },

  JOBS: {
    GET_ALL: "/api/jobs",
    CREATE: "/api/jobs",
    GET_ONE: (id) => `/api/jobs/${id}`,
    UPDATE: (id) => `/api/jobs/${id}`,
    DELETE: (id) => `/api/jobs/${id}`,
    TOGGLE_CLOSE: (id) => `/api/jobs/${id}/toggle-close`,
    EMPLOYER_JOBS: "/api/jobs/get-jobs-employer",
  },

  APPLICATIONS: {
    APPLY: (jobId) => `/api/applications/${jobId}`,
    GET_MY: "/api/applications/my",
    GET_APPLICANTS: (jobId) => `/api/applications/job/${jobId}`,
    GET_ONE: (id) => `/api/applications/${id}`,
    UPDATE_STATUS: (id) => `/api/applications/${id}/status`,
  },

  SAVED_JOBS: {
    SAVE: (id) => `/api/save-jobs/${id}`,
    UNSAVE: (id) => `/api/save-jobs/${id}`,
    GET_ALL: "/api/save-jobs/my",
  },

  IMAGE: {
    UPLOAD: "/api/auth/upload-image",
  },
};