export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender?: string;
    companyName?: string;
    gstNo?: string;
    role?: string;
    avatar?: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface RegisterRequest {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}
