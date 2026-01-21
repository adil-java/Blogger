import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("writerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("writerToken");
      localStorage.removeItem("writerUser");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  },
);

// ============ AUTH API ============
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  signup: async (name, email, password) => {
    const response = await api.post("/auth/signup", { name, email, password });
    return response.data;
  },

  googleAuth: async (googleId, email, name, avatar) => {
    const response = await api.post("/auth/google", {
      googleId,
      email,
      name,
      avatar,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

// ============ BLOG API ============
export const blogAPI = {
  // Get all blogs (public)
  getAll: async () => {
    const response = await api.get("/blog/all");
    return response.data;
  },

  // Get single blog by ID (public)
  getUserBlog: async () => {
    const response = await api.get("/blog/my-blogs");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },
  // Create new blog (admin)
  create: async (formData) => {
    const response = await api.post("/blog/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update blog (admin)
  update: async (id, formData) => {
    const response = await api.put(`/blog/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete blog (admin)
  delete: async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  },

  // Toggle publish status (admin)
  togglePublish: async (id) => {
    const response = await api.patch(`/blog/${id}/toggle-publish`);
    return response.data;
  },
};

// ============ COMMENT API ============
export const commentAPI = {
  // Get comments for a blog (public)
  getByBlogId: async (blogId) => {
    const response = await api.get(`/comment/blog/${blogId}`);
    return response.data;
  },

  // Add comment (public)
  add: async (blogId, name, content) => {
    const response = await api.post("/comment/add", { blogId, name, content });
    return response.data;
  },

  // Get all comments (admin)
  getAll: async () => {
    const response = await api.get("/comment/all");
    return response.data;
  },

  // Toggle comment approval (admin)
  toggleApproval: async (id) => {
    const response = await api.patch(`/comment/${id}/toggle-approval`);
    return response.data;
  },

  // Delete comment (admin)
  delete: async (id) => {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  },
};

// ============ DASHBOARD API ============
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },
};

export default api;
