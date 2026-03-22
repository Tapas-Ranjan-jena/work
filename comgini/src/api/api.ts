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

/**
 * A fetch-based API request utility for services that require it.
 * Centralizes base URL and authorization headers.
 */
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://13.126.81.144:3000/api/v1';
    const token = sessionStorage.getItem('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return response.json();
}
