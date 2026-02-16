import { useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../config/apiConfig';

export const useCampaignApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const startCampaign = useCallback(async (campaignData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_ENDPOINTS.CAMPAIGN.START, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err.message || 'Failed to start campaign';
            setError(errorMessage);
            console.error('Error starting campaign:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const stopCampaign = useCallback(async (campaignId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_ENDPOINTS.CAMPAIGN.STOP(campaignId), {
                method: 'PUT',
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
            const errorMessage = err.message || 'Failed to stop campaign';
            setError(errorMessage);
            console.error('Error stopping campaign:', err);
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
        startCampaign,
        stopCampaign,
        reset,
        loading,
        error,
        data,
    };
};

export default useCampaignApi;
