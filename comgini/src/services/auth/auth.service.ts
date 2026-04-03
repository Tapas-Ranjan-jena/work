import api from '../../api/api';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User, ResetPasswordRequest } from './types';

const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
        if (!response.data.data) throw new Error('No data returned from login');
        return response.data.data;
    },

    async register(data: RegisterRequest): Promise<void> {
        await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    },

    async getProfile(): Promise<User> {
        const response = await api.get<ApiResponse<User>>('/auth/profile');
        if (!response.data.data) throw new Error('No data returned from profile');
        return response.data.data;
    },

    async forgotPassword(email: string): Promise<ApiResponse> {
        const response = await api.post<ApiResponse>('/auth/forgot-password', { email });
        return response.data;
    },

    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
        const response = await api.post<ApiResponse>('/auth/reset-password', data);
        return response.data;
    },

    /**
     * Stabilized Logout: Clears local session immediately to prevent infinite loops 
     * even if the server is rate-limited or unreachable.
     */
    async logout() {
        // 1. Immediately wipe local session data to stop any further authenticated requests
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('user');

        try {
            // 2. Attempt to notify the backend (optional, won't block local logout)
            await api.post('/auth/logout');
        } catch (error) {
            // Log the error but don't re-throw, as the user is already locally logged out
            console.warn('Backend logout notification failed (likely already expired):', error);
        }
    },
};

export default authService;
