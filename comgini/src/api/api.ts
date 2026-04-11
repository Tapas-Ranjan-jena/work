import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://13.126.81.144:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Utility to clear local session data and stop loops
 */
const clearSession = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
};

// Helper to wait
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ⭐ GLOBAL RATE LIMIT & CONCURRENCY GATEKEEPER
let rateLimitCooldownUntil = 0;
let activeRequests = 0;
const MAX_CONCURRENT = 3; // Limit active requests to prevent 429
const requestQueue: (() => void)[] = [];

const processQueue = () => {
    if (activeRequests < MAX_CONCURRENT && requestQueue.length > 0) {
        const nextRequest = requestQueue.shift();
        if (nextRequest) {
            activeRequests++;
            nextRequest();
        }
    }
};

const waitForSlot = () => {
    if (activeRequests < MAX_CONCURRENT) {
        activeRequests++;
        return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
        requestQueue.push(resolve);
    });
};

const releaseSlot = () => {
    activeRequests--;
    processQueue();
};

const checkRateLimit = async () => {
    const now = Date.now();
    
    // 1. Proactive Staggering: Add a small random delay (0-150ms) to EVERY request 
    await delay(Math.floor(Math.random() * 150));

    // 2. Cooldown check: Wait if we are in a global cooldown from a previous 429
    if (now < rateLimitCooldownUntil) {
        const waitTime = rateLimitCooldownUntil - now;
        await delay(waitTime);
    }
};

const triggerRateLimitCooldown = (ms: number = 2000) => {
    rateLimitCooldownUntil = Date.now() + ms;
};

// Request interceptor for attaching the token and checking rate limit
api.interceptors.request.use(
    async (config) => {
        // Wait for a concurrency slot
        await waitForSlot();
        
        // Wait if we are in a global cooldown
        await checkRateLimit();

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

// Response interceptor for handling 401s and 429s with retry logic
api.interceptors.response.use(
    (response) => {
        releaseSlot(); // Release slot on success
        return response;
    },
    async (error) => {
        // Release slot on error, UNLESS it's a 429 (we retry within the same slot)
        if (!error.response || error.response.status !== 429) {
            releaseSlot();
        }

        const isAuthPage = window.location.pathname.includes('/login') || window.location.pathname.includes('/signup');
        const isExcludedRequest = 
            error.config?.url?.includes('/auth/login') || 
            error.config?.url?.includes('/auth/register') ||
            error.config?.url?.includes('/auth/logout');

        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401 && !isAuthPage && !isExcludedRequest) {
            console.warn(`Auth error ${error.response.status} detected. Clearing session and redirecting...`);
            clearSession();
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // Handle 429 Too Many Requests with Retry Logic
        if (error.response && error.response.status === 429) {
            const originalRequest = error.config;
            
            // Trigger a global cooldown for other requests
            triggerRateLimitCooldown(3000);

            // Use custom header to track retries
            const retryCount = Number(originalRequest.headers['X-Retry-Count'] || 0);
            
            if (retryCount < 4) {
                const currentAttempt = retryCount + 1;
                console.warn(`Axios Rate limit (429) hit at ${originalRequest.url}. Retrying attempt ${currentAttempt}...`);
                originalRequest.headers['X-Retry-Count'] = currentAttempt.toString();
                
                // Enhanced Exponential backoff with random jitter
                const waitTime = Math.pow(2, currentAttempt) * 1000 + (Math.random() * 1000);
                await delay(waitTime);
                
                // Note: We don't release the slot here because we are still using it for the retry
                return api(originalRequest);
            } else {
                releaseSlot(); // Finally release slot after max retries exhausted
                console.error("Rate limit (429) exhausted after 4 attempts. Failing request.");
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;

/**
 * A fetch-based API request utility for services that require it.
 * Refactored to include global error handling for stability and automatic retries for 429s.
 */
export async function apiRequest(endpoint: string, options: RequestInit & { _retryCount?: number } = {}) {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://13.126.81.144:3000/api';
    const token = sessionStorage.getItem('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    try {
        // Wait for a concurrency slot
        await waitForSlot();
        
        // Wait if we are in a global cooldown
        await checkRateLimit();

        const response = await fetch(`${baseURL}${endpoint}`, {
            ...options,
            headers,
        });

        // Release slot immediately after fetch completes (either success or error)
        releaseSlot();

        if (!response.ok) {
            // Handle 401/429 in fetch-based requests
            const isAuthPage = window.location.pathname.includes('/login');
            const isAuthRequest = endpoint.includes('/auth/login') || endpoint.includes('/auth/logout');

            if (response.status === 401 && !isAuthPage && !isAuthRequest) {
                clearSession();
                window.location.href = '/login';
                return;
            }

            if (response.status === 429) {
                console.warn(`Fetch Rate limit (429) hit for ${endpoint}.`);
                triggerRateLimitCooldown(2500);
                
                // Retry logic for fetch
                options._retryCount = options._retryCount || 0;
                if (options._retryCount < 3) {
                    options._retryCount += 1;
                    const waitTime = Math.pow(2, options._retryCount) * 1200 + (Math.random() * 1000);
                    await delay(waitTime);
                    return apiRequest(endpoint, options);
                }
                
                throw new Error("Too many requests. Please wait a moment.");
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error: any) {
        if (error.name === 'AbortError') return;
        throw error;
    }
}
