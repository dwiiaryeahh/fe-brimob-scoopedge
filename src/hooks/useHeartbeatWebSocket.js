import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';

const parseChannelNumber = (ch) => {
    if (!ch) return '';
    const match = ch.match(/CH-(\d+)/i);
    if (match) {
        const num = parseInt(match[1], 10);
        return num.toString().padStart(2, '0');
    }
    return ch;
};

const parseFirstValue = (value) => {
    if (!value) return '';
    const trimmed = value.toString().trim();
    if (trimmed.includes(',')) {
        return trimmed.split(',')[0].trim();
    }
    return trimmed;
};

const mapHeartbeatToChannel = (heartbeatData) => {
    const channelNumber = parseChannelNumber(heartbeatData.ch);

    return {
        ch: channelNumber,
        mode: heartbeatData.mode || '',
        arfcn: parseFirstValue(heartbeatData.arfcn),
        band: heartbeatData.band || '0',
        temp: heartbeatData.temp || '0',
        status: heartbeatData.state === 'OFFLINE' ? 'Deactivated' : 'Activated',
        state: heartbeatData.state || 'OFFLINE',
        provider: heartbeatData.provider || '',
        ip: heartbeatData.ip || '',
        mcc: parseFirstValue(heartbeatData.mcc),
        mnc: parseFirstValue(heartbeatData.mnc),
        timestamp: heartbeatData.timestamp || '',
        ul: heartbeatData.ul || '',
        dl: heartbeatData.dl || ''
    };
};

let cachedChannelsData = {};

export const useHeartbeatWebSocket = (options = {}) => {
    const { autoConnect = true } = options;

    const [channelsData, setChannelsData] = useState(cachedChannelsData);

    const wsUrl = `${import.meta.env.VITE_WS_BASE_URL}/heartbeat`;

    const handleMessage = useCallback((data) => {
        if (data.type === 'heartbeat' && data.ch) {
            const mappedData = mapHeartbeatToChannel(data);

            setChannelsData((prev) => {
                const updated = {
                    ...prev,
                    [mappedData.ch]: mappedData,
                };

                cachedChannelsData = updated;

                return updated;
            });
        }
    }, []);

    const {
        connectionState,
        isConnected,
        isConnecting,
        reconnectCount,
        connect,
        disconnect,
        reconnect,
    } = useWebSocket(wsUrl, {
        autoConnect,
        onMessage: handleMessage,
        reconnectInterval: 3000,
        maxReconnectAttempts: 10,
    });

    const getChannelData = useCallback((channelNumber) => {
        const formattedCh = channelNumber.toString().padStart(2, '0');
        return channelsData[formattedCh] || null;
    }, [channelsData]);

    const getAllChannels = useCallback(() => {
        return Object.values(channelsData).sort((a, b) => {
            return parseInt(a.ch, 10) - parseInt(b.ch, 10);
        });
    }, [channelsData]);

    const clearChannels = useCallback(() => {
        setChannelsData({});
        cachedChannelsData = {};
    }, []);

    return {
        channelsData,
        getChannelData,
        getAllChannels,
        clearChannels,

        connectionState,
        isConnected,
        isConnecting,
        reconnectCount,

        connect,
        disconnect,
        reconnect,
    };
};

export default useHeartbeatWebSocket;
