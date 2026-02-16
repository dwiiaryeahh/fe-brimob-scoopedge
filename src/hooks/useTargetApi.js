import { useState, useCallback } from 'react';
import { get, post, put, del, handleApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useTargetApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [targets, setTargets] = useState([]);

    const getTargets = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await get(API_ENDPOINTS.TARGET.LIST);

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

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTarget = useCallback(async (id, targetData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await put(
                API_ENDPOINTS.TARGET.UPDATE(id),
                targetData
            );

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTarget = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await del(API_ENDPOINTS.TARGET.DELETE(id));

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

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

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        targets,

        getTargets,
        createTarget,
        updateTarget,
        deleteTarget,
        importTargets,
        clearError,
    };
};

export default useTargetApi;
