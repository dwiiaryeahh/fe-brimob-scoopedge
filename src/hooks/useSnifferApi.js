import { useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useSnifferApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const startSniffer = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_ENDPOINTS.SNIFFER.START, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err.message || 'Failed to start sniffer';
            setError(errorMessage);
            console.error('Error starting sniffer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, []);

    return {
        startSniffer,
        reset,
        loading,
        error,
        data,
    };
};

export default useSnifferApi;
