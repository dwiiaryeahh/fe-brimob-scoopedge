/**
 * useReportApi Hook
 * Custom hook for Report (Campaign) API operations
 */

import { useState, useCallback } from 'react';
import { get, handleApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

/**
 * Custom hook for Report API operations
 * @returns {Object} API methods and state
 */
export const useReportApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reports, setReports] = useState([]);
    const [reportDetail, setReportDetail] = useState(null);

    /**
     * Get list of reports (campaigns)
     * @param {string} mode - Optional filter mode
     * @returns {Promise<Object>} Response with reports data
     */
    const getReports = useCallback(async (mode = '') => {
        setLoading(true);
        setError(null);

        try {
            const url = mode
                ? `${API_ENDPOINTS.CAMPAIGN.LIST}?mode=${mode}`
                : API_ENDPOINTS.CAMPAIGN.LIST;

            const response = await get(url);

            // Update local state with reports
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

    /**
     * Get report (campaign) detail
     * @param {number|string} id - Campaign ID
     * @returns {Promise<Object>} Response with report detail
     */
    const getReportDetail = useCallback(async (id) => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const response = await get(API_ENDPOINTS.CAMPAIGN.DETAIL(id));

            // Update local state with report detail
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

    /**
     * Export report data
     * @param {number|string} id - Campaign ID
     * @param {string} type - 'pdf' or 'excel'
     * @returns {string} The export URL
     */
    const getExportUrl = useCallback((id, type) => {
        return API_ENDPOINTS.CAMPAIGN.EXPORT(id, type);
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
        reports,
        reportDetail,

        // Methods
        getReports,
        getReportDetail,
        getExportUrl,
        clearError,
    };
};

export default useReportApi;
