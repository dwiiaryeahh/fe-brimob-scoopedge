/**
 * useTargetApi Hook
 * Custom hook for Target API operations with state management
 */

import { useState, useCallback } from 'react';
import { get, post, put, del, handleApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Custom hook for Target API operations
 * @returns {Object} API methods and state
 */
export const useTargetApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [targets, setTargets] = useState([]);

    /**
     * Get list of targets
     * @returns {Promise<Object>} Response with targets data
     */
    const getTargets = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await get(API_ENDPOINTS.TARGET.LIST);

            // Update local state with targets
            setTargets(response?.data || []);

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new target
     * @param {Object} targetData - Target data to create
     * @returns {Promise<Object>} Response with created target
     */
    const createTarget = useCallback(async (targetData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await post(
                API_ENDPOINTS.TARGET.CREATE,
                targetData,
                {},
                'create'
            );

            // Optionally refresh targets list after creation
            // await getTargets();

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing target
     * @param {number|string} id - Target ID
     * @param {Object} targetData - Updated target data
     * @returns {Promise<Object>} Response with updated target
     */
    const updateTarget = useCallback(async (id, targetData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await put(
                API_ENDPOINTS.TARGET.UPDATE(id),
                targetData
            );

            // Optionally refresh targets list after update
            // await getTargets();

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a target
     * @param {number|string} id - Target ID
     * @returns {Promise<Object>} Response confirming deletion
     */
    const deleteTarget = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await del(API_ENDPOINTS.TARGET.DELETE(id));

            // Optionally refresh targets list after deletion
            // await getTargets();

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import targets from file
     * @param {File} file - File to import
     * @returns {Promise<Object>} Response with import results
     */
    const importTargets = useCallback(async (file) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await post(
                API_ENDPOINTS.TARGET.IMPORT,
                formData,
                {},
                'import'
            );

            // Optionally refresh targets list after import
            // await getTargets();

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Clear error state
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        // State
        loading,
        error,
        targets,

        // Methods
        getTargets,
        createTarget,
        updateTarget,
        deleteTarget,
        importTargets,
        clearError,
    };
};

export default useTargetApi;
