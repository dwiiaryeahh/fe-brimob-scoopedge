/**
 * useWebSocket Hook
 * Reusable WebSocket hook with automatic connection management and reconnection
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * WebSocket connection states
 */
export const WS_STATES = {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    ERROR: 'ERROR',
};

/**
 * Custom hook for WebSocket connections
 * @param {string} url - WebSocket URL
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoConnect - Auto-connect on mount (default: true)
 * @param {number} options.reconnectInterval - Reconnect interval in ms (default: 3000)
 * @param {number} options.maxReconnectAttempts - Max reconnection attempts (default: 5)
 * @param {Function} options.onMessage - Message handler callback
 * @param {Function} options.onOpen - Connection open callback
 * @param {Function} options.onClose - Connection close callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} WebSocket state and methods
 */
export const useWebSocket = (url, options = {}) => {
    const {
        autoConnect = true,
        reconnectInterval = 3000,
        maxReconnectAttempts = 5,
        onMessage,
        onOpen,
        onClose,
        onError,
    } = options;

    const [connectionState, setConnectionState] = useState(WS_STATES.DISCONNECTED);
    const [lastMessage, setLastMessage] = useState(null);
    const [reconnectCount, setReconnectCount] = useState(0);

    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const shouldReconnectRef = useRef(true);

    /**
     * Connect to WebSocket
     */
    const connect = useCallback(() => {
        if (!url) {
            console.error('WebSocket URL is required');
            return;
        }

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            console.warn('WebSocket is already connected');
            return;
        }

        try {
            setConnectionState(WS_STATES.CONNECTING);

            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = (event) => {
                console.log('WebSocket connected:', url);
                setConnectionState(WS_STATES.CONNECTED);
                setReconnectCount(0);

                if (onOpen) {
                    onOpen(event);
                }
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setLastMessage(data);

                    if (onMessage) {
                        onMessage(data, event);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                    setLastMessage(event.data);

                    if (onMessage) {
                        onMessage(event.data, event);
                    }
                }
            };

            ws.onclose = (event) => {
                console.log('WebSocket disconnected:', event.code, event.reason);
                setConnectionState(WS_STATES.DISCONNECTED);
                wsRef.current = null;

                if (onClose) {
                    onClose(event);
                }

                // Attempt reconnection
                if (shouldReconnectRef.current && reconnectCount < maxReconnectAttempts) {
                    const delay = reconnectInterval * Math.pow(1.5, reconnectCount); // Exponential backoff
                    console.log(`Reconnecting in ${delay}ms... (attempt ${reconnectCount + 1}/${maxReconnectAttempts})`);

                    reconnectTimeoutRef.current = setTimeout(() => {
                        setReconnectCount(prev => prev + 1);
                        // eslint-disable-next-line react-hooks/immutability
                        connect();
                    }, delay);
                } else if (reconnectCount >= maxReconnectAttempts) {
                    console.error('Max reconnection attempts reached');
                    setConnectionState(WS_STATES.ERROR);
                }
            };

            ws.onerror = (event) => {
                console.error('WebSocket error:', event);
                setConnectionState(WS_STATES.ERROR);

                if (onError) {
                    onError(event);
                }
            };

        } catch (error) {
            console.error('Error creating WebSocket connection:', error);
            setConnectionState(WS_STATES.ERROR);

            if (onError) {
                onError(error);
            }
        }
    }, [url, reconnectInterval, maxReconnectAttempts, reconnectCount, onMessage, onOpen, onClose, onError]);

    /**
     * Disconnect from WebSocket
     */
    const disconnect = useCallback(() => {
        shouldReconnectRef.current = false;

        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setConnectionState(WS_STATES.DISCONNECTED);
        setReconnectCount(0);
    }, []);

    /**
     * Send message through WebSocket
     * @param {any} data - Data to send (will be JSON stringified if object)
     */
    const sendMessage = useCallback((data) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected');
            return false;
        }

        try {
            const message = typeof data === 'string' ? data : JSON.stringify(data);
            wsRef.current.send(message);
            return true;
        } catch (error) {
            console.error('Error sending WebSocket message:', error);
            return false;
        }
    }, []);

    /**
     * Reconnect to WebSocket
     */
    const reconnect = useCallback(() => {
        disconnect();
        shouldReconnectRef.current = true;
        setReconnectCount(0);
        connect();
    }, [connect, disconnect]);

    // Auto-connect on mount
    useEffect(() => {
        if (autoConnect) {
            shouldReconnectRef.current = true;
            connect();
        }

        // Cleanup on unmount
        return () => {
            shouldReconnectRef.current = false;

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }

            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [autoConnect, connect]);

    return {
        // State
        connectionState,
        lastMessage,
        reconnectCount,
        isConnected: connectionState === WS_STATES.CONNECTED,
        isConnecting: connectionState === WS_STATES.CONNECTING,

        // Methods
        connect,
        disconnect,
        sendMessage,
        reconnect,
    };
};

export default useWebSocket;
