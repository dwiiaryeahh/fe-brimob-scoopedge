const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';

export const API_ENDPOINTS = {
    // Target endpoints
    TARGET: {
        LIST: `${API_BASE_URL}/target`,
        CREATE: `${API_BASE_URL}/target/create`,
        UPDATE: (id) => `${API_BASE_URL}/target/${id}/update`,
        DELETE: (id) => `${API_BASE_URL}/target/${id}/delete`,
        IMPORT: `${API_BASE_URL}/target/import`,
    },

    // Campaign endpoints
    CAMPAIGN: {
        LIST: `${API_BASE_URL}/campaign`,
        CREATE: `${API_BASE_URL}/campaign/create`,
        UPDATE: (id) => `${API_BASE_URL}/campaign/${id}/update`,
        DELETE: (id) => `${API_BASE_URL}/campaign/${id}/delete`,
        DETAIL: (id) => `${API_BASE_URL}/campaign/${id}/detail`,
        EXPORT: (id, type) => `${API_BASE_URL}/campaign/${id}/export/${type}`,
    },
};

export const WS_ENDPOINTS = {
    NOTIFICATIONS: `${WS_BASE_URL}/notifications`,
    TARGETS: `${WS_BASE_URL}/targets`,
    CAMPAIGNS: `${WS_BASE_URL}/campaigns`,
};


export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const REQUEST_TIMEOUT = 30000; // 30 seconds

export default {
    API_BASE_URL,
    WS_BASE_URL,
    API_ENDPOINTS,
    WS_ENDPOINTS,
    DEFAULT_HEADERS,
    REQUEST_TIMEOUT,
};
