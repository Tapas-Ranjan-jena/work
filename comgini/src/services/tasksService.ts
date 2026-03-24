import api from "../api/api";

// TASK PAYLOAD TYPES
export interface CreateTaskPayload {
    title: string;
    description: string;
    client_id: number | null;
    company_id: number;
    assigned_to: number | null;
    priority: string;
    status?: string;
    due_date: string;
    estimated_hours: number;
    category: string;
}

export interface UpdateTaskPayload {
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string;
    estimated_hours: number;
    actual_hours: number;
    category: string;
}

export interface CallLogPayload {
    client_id: number | null;
    contact_person: string;
    mobile_number: string;
    start_time: string; // "YYYY-MM-DD HH:mm:ss"
    end_time: string; // "YYYY-MM-DD HH:mm:ss"
    duration_minutes: number;
    notes: string;
}

const tasksService = {

    /** GET ALL TASKS with filters */
    getAllTasks: async (page: number = 1, limit: number = 20, status?: string, is_starred?: boolean) => {
        try {
            const params: any = { page, limit };
            if (status) params.status = status;
            if (is_starred !== undefined) params.is_starred = is_starred;

            const response = await api.get("/tasks", { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET TASK BY ID */
    getTaskById: async (taskId: number | string) => {
        try {
            const response = await api.get(`/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** CREATE TASK */
    createTask: async (payload: CreateTaskPayload) => {
        try {
            const response = await api.post("/tasks", payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** UPDATE TASK */
    updateTask: async (taskId: number | string, payload: UpdateTaskPayload) => {
        try {
            const response = await api.put(`/tasks/${taskId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** STAR TASK (Toggle) */
    starTask: async (taskId: number | string) => {
        try {
            const response = await api.patch(`/tasks/${taskId}/star`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** UPDATE TASK STATUS */
    updateTaskStatus: async (taskId: number | string, status: string) => {
        try {
            const response = await api.put(`/tasks/${taskId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** DELETE TASK */
    deleteTask: async (taskId: number | string) => {
        try {
            const response = await api.delete(`/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** ADD COMMENT */
    addTaskComment: async (taskId: number | string, comment: string) => {
        try {
            const response = await api.post(`/tasks/${taskId}/comments`, { comment });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** START TIMER */
    startTaskTimer: async (taskId: number | string) => {
        try {
            const response = await api.post(`/tasks/${taskId}/timer/start`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** STOP TIMER */
    stopTaskTimer: async (timerId: number | string) => {
        try {
            const response = await api.put(`/tasks/timer/${timerId}/stop`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** CREATE CALL LOG */
    createCallLog: async (payload: CallLogPayload) => {
        try {
            const response = await api.post(`/tasks/call-logs`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET CALL LOGS */
    getCallLogs: async () => {
        try {
            const response = await api.get(`/tasks/call-logs/list`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET TIMESHEETS */
    getTimesheetsReport: async () => {
        try {
            const response = await api.get(`/tasks/timesheets/report`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default tasksService;
