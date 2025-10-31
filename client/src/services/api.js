const API_BASE_URL = "http://localhost:5000/api";

// Real API functions
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },

  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },

  updateProfile: async (token, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },
};

export const newsAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      return await response.json();
    } catch {
      return {
        success: false,
        data: [],
        message: "Network error. Please check your connection.",
      };
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/category/${category}`);
      return await response.json();
    } catch {
      return {
        success: false,
        data: [],
        message: "Network error. Please check your connection.",
      };
    }
  },
};

export const contentAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/content`);
      return await response.json();
    } catch {
      return {
        success: false,
        data: [],
        message: "Network error. Please check your connection.",
      };
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/content/category/${category}`
      );
      return await response.json();
    } catch {
      return {
        success: false,
        data: [],
        message: "Network error. Please check your connection.",
      };
    }
  },
};

export default { authAPI, newsAPI, contentAPI };
