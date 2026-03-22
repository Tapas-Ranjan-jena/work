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

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Backend logout failed:', error);
        } finally {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('user');
        }
    },
};

export default authService;
