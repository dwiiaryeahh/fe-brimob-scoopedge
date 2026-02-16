import { useState, useCallback } from 'react';
import { get, handleApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useReportApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reports, setReports] = useState([]);
    const [reportDetail, setReportDetail] = useState(null);

    const getReports = useCallback(async (mode = '') => {
        setLoading(true);
        setError(null);

        try {
            const url = mode
                ? `${API_ENDPOINTS.CAMPAIGN.LIST}?mode=${mode}`
                : API_ENDPOINTS.CAMPAIGN.LIST;

            const response = await get(url);

            setReports(response?.data || []);

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getReportDetail = useCallback(async (id) => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const response = await get(API_ENDPOINTS.CAMPAIGN.DETAIL(id));

            setReportDetail(response || null);

            return response;
        } catch (err) {
            const errorResponse = handleApiError(err);
            setError(errorResponse.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getExportUrl = useCallback((id, type) => {
        return API_ENDPOINTS.CAMPAIGN.EXPORT(id, type);
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        reports,
        reportDetail,

        getReports,
        getReportDetail,
        getExportUrl,
        clearError,
    };
};

export default useReportApi;
