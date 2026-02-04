/**
 * API Client Utility
 * Centralized fetch wrapper with error handling and interceptors
 */

import { DEFAULT_HEADERS, REQUEST_TIMEOUT } from '../config/apiConfig';
import { formatErrorResponse, ensureStandardResponse } from './responseFormatter';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Makes an HTTP request with timeout and error handling
 * @param {string} url - The URL to request
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const makeRequest = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle non-OK responses
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

        // Parse JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        clearTimeout(timeoutId);

        // Handle abort/timeout
        if (error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408, { timeout: true });
        }

        // Handle network errors
        if (error instanceof TypeError) {
            throw new ApiError('Network error - please check your connection', 0, { network: true });
        }

        // Re-throw ApiError
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle unknown errors
        throw new ApiError(error.message || 'An unexpected error occurred', 500, error);
    }
};

/**
 * GET request
 * @param {string} url - The URL to request
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
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

/**
 * POST request
 * @param {string} url - The URL to request
 * @param {any} body - Request body
 * @param {Object} options - Additional fetch options
 * @param {string} operation - Operation type for response formatting
 * @returns {Promise<any>} Response data
 */
export const post = async (url, body, options = {}, operation = 'create') => {
    const isFormData = body instanceof FormData;

    const headers = isFormData
        ? { ...options.headers } // Don't set Content-Type for FormData
        : { ...DEFAULT_HEADERS, ...options.headers };

    const response = await makeRequest(url, {
        method: 'POST',
        headers,
        body: isFormData ? body : JSON.stringify(body),
        ...options,
    });

    // Ensure response is in standard format
    return ensureStandardResponse(response, operation);
};

/**
 * PUT request
 * @param {string} url - The URL to request
 * @param {any} body - Request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
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

    // Ensure response is in standard format
    return ensureStandardResponse(response, 'update');
};

/**
 * DELETE request
 * @param {string} url - The URL to request
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const del = async (url, options = {}) => {
    const response = await makeRequest(url, {
        method: 'DELETE',
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers,
        },
        ...options,
    });

    // Ensure response is in standard format
    return ensureStandardResponse(response, 'delete');
};

/**
 * Handles API errors and returns a formatted error response
 * @param {Error} error - The error to handle
 * @returns {Object} Formatted error response
 */
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
