import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { WS_ENDPOINTS } from '../config/apiConfig';

export const useSnifferWebSocket = (options = {}) => {
    const { autoConnect = false } = options;

    const [sniffingData, setSniffingData] = useState([]);

    const [progressState, setProgressState] = useState({
        progress: 0,
        status: 'idle',
        total_devices: 0,
        scanning_devices: 0,
        completed_devices: 0,
        elapsed_minutes: 0,
    });

    const [isCompleted, setIsCompleted] = useState(false);

    const handleSniffingMessage = useCallback((data) => {
        if (data.type === 'sniffing') {
            setSniffingData((prev) => [...prev, {
                ip: data.ip,
                arfcn: data.arfcn,
                operator: data.operator,
                band: data.band,
                dl_freq: data.dl_freq,
                ul_freq: data.ul_freq,
                pci: data.pci,
                rsrp: data.rsrp,
                timestamp: data.timestamp,
                ch: data.ch,
            }]);
        }
    }, []);

    const handleStateMessage = useCallback((data) => {
        if (data.type === 'sniffing_state' && data.progress) {
            const { progress } = data;

            setProgressState({
                progress: progress.progress || 0,
                status: progress.status || 'idle',
                total_devices: progress.total_devices || 0,
                scanning_devices: progress.scanning_devices || 0,
                completed_devices: progress.completed_devices || 0,
                elapsed_minutes: progress.elapsed_minutes || 0,
            });

            if (progress.progress >= 100 && progress.status !== 'scanning') {
                setIsCompleted(true);
            }
        }
    }, []);

    const sniffingWs = useWebSocket(WS_ENDPOINTS.SNIFFING, {
        autoConnect,
        onMessage: handleSniffingMessage,
        reconnectInterval: 3000,
        maxReconnectAttempts: 10,
    });

    const stateWs = useWebSocket(WS_ENDPOINTS.SNIFFING_STATE, {
        autoConnect,
        onMessage: handleStateMessage,
        reconnectInterval: 3000,
        maxReconnectAttempts: 10,
    });

    const connect = useCallback(() => {
        sniffingWs.connect();
        stateWs.connect();
    }, [sniffingWs, stateWs]);

    const disconnect = useCallback(() => {
        sniffingWs.disconnect();
        stateWs.disconnect();
    }, [sniffingWs, stateWs]);

    const clearData = useCallback(() => {
        setSniffingData([]);
        setProgressState({
            progress: 0,
            status: 'idle',
            total_devices: 0,
            scanning_devices: 0,
            completed_devices: 0,
            elapsed_minutes: 0,
        });
        setIsCompleted(false);
    }, []);

    const resetCompletion = useCallback(() => {
        setIsCompleted(false);
    }, []);

    return {
        sniffingData,
        sniffingCount: sniffingData.length,

        progressState,
        isCompleted,

        isConnected: sniffingWs.isConnected && stateWs.isConnected,
        isConnecting: sniffingWs.isConnecting || stateWs.isConnecting,

        connect,
        disconnect,
        clearData,
        resetCompletion,
    };
};

export default useSnifferWebSocket;
