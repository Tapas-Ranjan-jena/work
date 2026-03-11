import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://13.126.81.144:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for attaching the token
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401s
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthPage = window.location.pathname.includes('/login') || window.location.pathname.includes('/signup');
        const isAuthRequest = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');

        if (error.response && error.response.status === 401 && !isAuthPage && !isAuthRequest) {
            // Auto logout on unauthorized
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
