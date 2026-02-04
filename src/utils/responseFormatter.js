/**
 * Response Formatter Utility
 * Standardizes API responses to a consistent format
 */

/**
 * Standard response format:
 * {
 *   status: "success" | "error",
 *   message: string,
 *   data: any,
 *   total?: number
 * }
 */

/**
 * Formats a successful response
 * @param {any} data - The response data
 * @param {string} message - Success message
 * @param {number} total - Optional total count for list responses
 * @returns {Object} Standardized response
 */
export const formatSuccessResponse = (data, message = 'Operation completed successfully', total = null) => {
    const response = {
        status: 'success',
        message,
        data,
    };

    if (total !== null) {
        response.total = total;
    }

    return response;
};

/**
 * Formats an error response
 * @param {string} message - Error message
 * @param {any} error - Optional error details
 * @returns {Object} Standardized error response
 */
export const formatErrorResponse = (message = 'An error occurred', error = null) => {
    return {
        status: 'error',
        message,
        error,
    };
};

/**
 * Wraps single data response in standard format
 * Used for POST and PUT operations that return single objects
 * @param {any} data - The response data
 * @param {string} operation - The operation type (create, update, delete)
 * @returns {Object} Standardized response
 */
export const wrapSingleResponse = (data, operation = 'completed') => {
    const messages = {
        create: 'Resource created successfully',
        update: 'Resource updated successfully',
        delete: 'Resource deleted successfully',
        import: 'Import completed successfully',
        completed: 'Operation completed successfully',
    };

    return formatSuccessResponse(data, messages[operation] || messages.completed);
};

/**
 * Checks if a response is already in standard format
 * @param {any} response - The response to check
 * @returns {boolean} True if already standardized
 */
export const isStandardizedResponse = (response) => {
    return (
        response &&
        typeof response === 'object' &&
        'status' in response &&
        'message' in response &&
        'data' in response
    );
};

/**
 * Ensures response is in standard format
 * If already standardized, returns as-is
 * If not, wraps it in standard format
 * @param {any} response - The response to standardize
 * @param {string} operation - The operation type
 * @returns {Object} Standardized response
 */
export const ensureStandardResponse = (response, operation = 'completed') => {
    if (isStandardizedResponse(response)) {
        return response;
    }

    return wrapSingleResponse(response, operation);
};

export default {
    formatSuccessResponse,
    formatErrorResponse,
    wrapSingleResponse,
    isStandardizedResponse,
    ensureStandardResponse,
};
