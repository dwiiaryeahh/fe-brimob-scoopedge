
import { useState, useEffect, useCallback, useRef } from 'react';
import { WS_ENDPOINTS } from '../config/apiConfig';

const STORAGE_KEY_IMSI_DATA = 'campaignImsiData';

export const useCampaignWebSocket = (campaignId, targetNameMap = {}) => {
    const [imsiData, setImsiData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const campaignIdRef = useRef(campaignId);
    const targetNameMapRef = useRef(targetNameMap);

    useEffect(() => {
        campaignIdRef.current = campaignId;
    }, [campaignId]);

    useEffect(() => {
        targetNameMapRef.current = targetNameMap;
    }, [targetNameMap]);

    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY_IMSI_DATA);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setImsiData(parsed);
                console.log('Restored IMSI data from localStorage:', parsed.length, 'entries');
            } catch (err) {
                console.error('Failed to parse stored IMSI data:', err);
                localStorage.removeItem(STORAGE_KEY_IMSI_DATA);
            }
        }
    }, []);

    useEffect(() => {
        if (imsiData.length > 0) {
            localStorage.setItem(STORAGE_KEY_IMSI_DATA, JSON.stringify(imsiData));
        }
    }, [imsiData]);

    useEffect(() => {
        setImsiData((prevData) => {
            return prevData.map(item => ({
                ...item,
            }));
        });
    }, [targetNameMap]);

    /**
     * Connect to WebSocket
     */
    const connect = useCallback(() => {
        if (!campaignId) {
            console.warn('No campaign ID provided for WebSocket connection');
            return;
        }

        try {
            const wsUrl = WS_ENDPOINTS.DATA_IMSI(campaignId);
            console.log('Connecting to WebSocket:', wsUrl);

            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                setError(null);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('Received IMSI data:', data);

                    setImsiData((prevData) => {
                        const existingIndex = prevData.findIndex(item => item.imsi === data.imsi);

                        const currentTargetNameMap = targetNameMapRef.current;
                        const enrichedData = {
                            ...data,
                            targetName: currentTargetNameMap[data.imsi] || null,
                            lastUpdated: data.timestamp || new Date().toISOString(),
                        };

                        if (existingIndex !== -1) {
                            const updated = [...prevData];
                            updated[existingIndex] = {
                                ...updated[existingIndex],
                                ...enrichedData,
                            };
                            console.log('Updated existing IMSI:', data.imsi);
                            return updated;
                        } else {
                            console.log('Added new IMSI:', data.imsi);
                            return [...prevData, enrichedData];
                        }
                    });
                } catch (err) {
                    console.error('Error parsing WebSocket message:', err);
                    setError('Failed to parse message data');
                }
            };

            ws.onerror = (event) => {
                console.error('WebSocket error:', event);
                setError('WebSocket connection error');
                setIsConnected(false);
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);

                const currentCampaignId = campaignIdRef.current;
                if (currentCampaignId) {
                    reconnectTimeoutRef.current = setTimeout(() => {
                        console.log('Attempting to reconnect...');
                        // eslint-disable-next-line react-hooks/immutability
                        connect();
                    }, 3000);
                }
            };

            wsRef.current = ws;
        } catch (err) {
            console.error('Error creating WebSocket connection:', err);
            setError('Failed to create WebSocket connection');
        }
    }, [campaignId]);

    /**
     * Disconnect from WebSocket
     */
    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setIsConnected(false);
    }, []);

    /**
     * Clear IMSI data (both state and localStorage)
     */
    const clearData = useCallback(() => {
        setImsiData([]);
        localStorage.removeItem(STORAGE_KEY_IMSI_DATA);
        console.log('Cleared IMSI data');
    }, []);

    useEffect(() => {
        if (campaignId) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [campaignId, connect, disconnect]);

    return {
        imsiData,
        isConnected,
        error,
        connect,
        disconnect,
        clearData,
    };
};

export default useCampaignWebSocket;
