import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import authService from '../services/auth/auth.service';
import type { User, LoginRequest, RegisterRequest, ResetPasswordRequest, ApiResponse } from '../services/auth/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    forgotPassword: (email: string) => Promise<ApiResponse>;
    resetPassword: (data: ResetPasswordRequest) => Promise<ApiResponse>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = sessionStorage.getItem('user');
            if (savedUser === 'undefined' || !savedUser) return null;
            return JSON.parse(savedUser);
        } catch (e) {
            console.error("Error parsing user from sessionStorage", e);
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = sessionStorage.getItem('accessToken');
            
            // ⭐ RECURSION GUARD: Only fetch profile if a valid token exists
            if (token && token !== 'undefined') {
                try {
                    const profile = await authService.getProfile();
                    setUser(profile);
                    sessionStorage.setItem('user', JSON.stringify(profile));
                } catch (error: any) {
                    // Log the error but don't loop
                    console.error('Initial auth check failed:', error.message || 'Network error');
                    
                    // IF it's 401 Unauthorized, we clear. 
                    // IF it's 429 Too many, we JUST STOP loading without clearing current context.
                    if (error.response?.status === 401) {
                        await authService.logout();
                        setUser(null);
                    }
                }
            } else {
                // If no token exists, ensure local state is clean
                setUser(null);
            }
            
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials);
        const { accessToken, refreshToken, user: userData } = response;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (data: RegisterRequest) => {
        await authService.register(data);
    };

    const forgotPassword = async (email: string) => {
        return await authService.forgotPassword(email);
    };

    const resetPassword = async (data: ResetPasswordRequest) => {
        return await authService.resetPassword(data);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
