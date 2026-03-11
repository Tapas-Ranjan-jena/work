import api from '../../api/api';
import type { ApiResponse, User } from './types';

const userService = {
    async getUserById(id: string): Promise<User> {
        const response = await api.get<ApiResponse<User>>(`/users/${id}`);
        if (!response.data.data) throw new Error('No data returned from getUserById');
        return response.data.data;
    }
};

export default userService;
