import { DEFAULT_HEADERS, REQUEST_TIMEOUT } from '../config/apiConfig';
import { formatErrorResponse, ensureStandardResponse } from './responseFormatter';


export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

const makeRequest = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: response.statusText };
            }

            throw new ApiError(
                errorData.message || `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                errorData
            );
        }

        const data = await response.json();
        return data;

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408, { timeout: true });
        }

        if (error instanceof TypeError) {
            throw new ApiError('Network error - please check your connection', 0, { network: true });
        }

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(error.message || 'An unexpected error occurred', 500, error);
    }
};

export const get = async (url, options = {}) => {
    return makeRequest(url, {
        method: 'GET',
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers,
        },
        ...options,
    });
};

export const post = async (url, body, options = {}, operation = 'create') => {
    const isFormData = body instanceof FormData;

    const headers = isFormData
        ? { ...options.headers } 
        : { ...DEFAULT_HEADERS, ...options.headers };

    const response = await makeRequest(url, {
        method: 'POST',
        headers,
        body: isFormData ? body : JSON.stringify(body),
        ...options,
    });

    return ensureStandardResponse(response, operation);
};

export const put = async (url, body, options = {}) => {
    const response = await makeRequest(url, {
        method: 'PUT',
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers,
        },
        body: JSON.stringify(body),
        ...options,
    });

    return ensureStandardResponse(response, 'update');
};

export const del = async (url, options = {}) => {
    const response = await makeRequest(url, {
        method: 'DELETE',
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers,
        },
        ...options,
    });

    return ensureStandardResponse(response, 'delete');
};

export const handleApiError = (error) => {
    if (error instanceof ApiError) {
        return formatErrorResponse(error.message, error.data);
    }

    return formatErrorResponse(error.message || 'An unexpected error occurred', error);
};

export default {
    get,
    post,
    put,
    del,
    handleApiError,
    ApiError,
};
