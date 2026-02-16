
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useCampaignApi } from '../hooks/useCampaignApi';
import { useTargetApi } from '../hooks/useTargetApi';
import { useCampaignWebSocket } from '../hooks/useCampaignWebSocket';
import { API_ENDPOINTS } from '../config/apiConfig';

const CampaignContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCampaign = () => {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error('useCampaign must be used within CampaignProvider');
    }
    return context;
};

export const CampaignProvider = ({ children }) => {
    const [activeCampaign, setActiveCampaign] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [targetNameMap, setTargetNameMap] = useState({}); // Map IMSI to target names
    const [targetAlertMap, setTargetAlertMap] = useState({}); // Map IMSI to alert status
    const activeCampaignRef = useRef(null); // Ref for immediate access in cleanup

    const alertAudio = useRef(new Audio('/alert.mpeg'));

    const { startCampaign, stopCampaign, loading, error } = useCampaignApi();
    const { getTargets } = useTargetApi();
    const { imsiData, isConnected, clearData } = useCampaignWebSocket(
        activeCampaign?.id || localStorage.getItem('campaignId'),
        targetNameMap
    );

    const fetchAndPopulateTargets = useCallback(async () => {
        try {
            const response = await getTargets();
            if (response?.data) {
                const nameMap = {};
                const alertMap = {};
                response.data.forEach(target => {
                    if (target.imsi) {
                        nameMap[target.imsi] = target.name;
                        alertMap[target.imsi] = target.alert_status;
                    }
                });
                setTargetNameMap(nameMap);
                setTargetAlertMap(alertMap);
                console.log('Targets loaded:', Object.keys(nameMap).length);
            }
        } catch (err) {
            console.error('Failed to load targets:', err);
        }
    }, [getTargets]);

    useEffect(() => {
        fetchAndPopulateTargets();
    }, [fetchAndPopulateTargets]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAndPopulateTargets();
        }, 10000); 

        return () => clearInterval(interval);
    }, [fetchAndPopulateTargets]);

    useEffect(() => {
        alertAudio.current.loop = true;

        const hasActiveAlert = isRunning && imsiData.some(item => {
            const status = targetAlertMap[item.imsi] || item.alert_status;
            return status === 'Active';
        });

        if (hasActiveAlert) {
            alertAudio.current.play().catch(e => console.warn("Audio play failed:", e));
        } else {
            alertAudio.current.pause();
            alertAudio.current.currentTime = 0;
        }

        return () => {
            if (!isRunning) {
                alertAudio.current.pause();
                // eslint-disable-next-line react-hooks/exhaustive-deps
                alertAudio.current.currentTime = 0;
            }
        };
    }, [imsiData, targetAlertMap, isRunning]);

    useEffect(() => {
        return () => {
            alertAudio.current.pause();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            alertAudio.current.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        activeCampaignRef.current = activeCampaign;
    }, [activeCampaign]);

    const clearStorage = useCallback(() => {
        localStorage.removeItem('campaignId');
        localStorage.removeItem('campaignStartTime');
        localStorage.removeItem('campaignDuration');
        localStorage.removeItem('campaignName');
    }, []);

    useEffect(() => {
        const storedCampaignId = localStorage.getItem('campaignId');
        const storedStartTime = localStorage.getItem('campaignStartTime');
        const storedDuration = localStorage.getItem('campaignDuration');
        const storedCampaignName = localStorage.getItem('campaignName');

        if (storedCampaignId && storedStartTime && storedDuration) {
            const startTime = parseInt(storedStartTime, 10);
            const durationSec = parseInt(storedDuration, 10);
            const now = Math.floor(Date.now() / 1000);
            const elapsed = now - startTime;
            const remaining = durationSec - elapsed;

            if (remaining > 0) {
                setActiveCampaign({ id: storedCampaignId, name: storedCampaignName });
                setIsRunning(true);
                setRemainingTime(remaining);
            } else {
                clearStorage();
            }
        }
    }, [clearStorage]);

    const handleStartCampaign = useCallback(async (campaignData) => {
        clearData();
        fetchAndPopulateTargets();
        try {
            const result = await startCampaign(campaignData);

            if (result.status === 'success' && result.data) {
                const campaign = result.data;
                setActiveCampaign(campaign);
                setIsRunning(true);

                const [minutes, seconds] = campaignData.duration.split(':').map(Number);
                const totalSeconds = (minutes * 60) + seconds;
                setRemainingTime(totalSeconds);

                localStorage.setItem('campaignId', campaign.id);
                localStorage.setItem('campaignName', campaign.name);
                localStorage.setItem('campaignStartTime', Math.floor(Date.now() / 1000).toString());
                localStorage.setItem('campaignDuration', totalSeconds.toString());

                return result;
            }
        } catch (err) {
            console.error('Failed to start campaign:', err);
            throw err;
        }
    }, [startCampaign, clearData, fetchAndPopulateTargets]);

    const handleStopCampaign = useCallback(async (id = null) => {
        const campaignId = id || activeCampaign?.id || localStorage.getItem('campaignId');

        if (!campaignId) {
            console.warn('No active campaign to stop');
            return;
        }

        try {
            await stopCampaign(campaignId);
        } catch (err) {
            console.error('Failed to stop campaign:', err);
        } finally {
            setIsRunning(false);
            setRemainingTime(0);
            setActiveCampaign(null);
            clearStorage();
            alertAudio.current.pause();
            alertAudio.current.currentTime = 0;
        }
    }, [activeCampaign, stopCampaign, clearStorage]);

    // const resetCampaign = useCallback(() => {
    //     setIsRunning(false);
    //     setRemainingTime(0);
    //     setActiveCampaign(null);
    //     clearStorage();
    //     clearData();
    //     setTargetNameMap({});
    //     setTargetAlertMap({});

    //     // Stop audio
    //     alertAudio.current.pause();
    //     alertAudio.current.currentTime = 0;
    // }, [clearData, clearStorage]);

    const value = {
        activeCampaign,
        isRunning,
        setIsRunning,
        remainingTime,
        setRemainingTime,
        imsiData,
        isConnected,
        loading,
        error,
        targetNameMap,
        setTargetNameMap,
        targetAlertMap,
        setTargetAlertMap,
        startCampaign: handleStartCampaign,
        stopCampaign: handleStopCampaign,
    };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
};

export default CampaignContext;
