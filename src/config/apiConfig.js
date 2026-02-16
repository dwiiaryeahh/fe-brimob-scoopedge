const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888';
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';

export const API_ENDPOINTS = {
    // Target endpoints
    TARGET: {
        LIST: `${API_BASE_URL}/target`,
        LIST_ACTIVE: `${API_BASE_URL}/target?target_status=Active`,
        CREATE: `${API_BASE_URL}/target/create`,
        UPDATE: (id) => `${API_BASE_URL}/target/${id}/update`,
        DELETE: (id) => `${API_BASE_URL}/target/${id}/delete`,
        IMPORT: `${API_BASE_URL}/target/import`,
    },

    // Campaign endpoints
    CAMPAIGN: {
        LIST: `${API_BASE_URL}/campaign`,
        CREATE: `${API_BASE_URL}/campaign/create`,
        START: `${API_BASE_URL}/campaign/start`,
        STOP: (id) => `${API_BASE_URL}/campaign/${id}/stop`,
        UPDATE: (id) => `${API_BASE_URL}/campaign/${id}/update`,
        DELETE: (id) => `${API_BASE_URL}/campaign/${id}/delete`,
        DETAIL: (id) => `${API_BASE_URL}/campaign/${id}/detail`,
        EXPORT: (id, type) => `${API_BASE_URL}/campaign/${id}/export/${type}`,
    },

    // Sniffer endpoints
    SNIFFER: {
        START: `${API_BASE_URL}/sniffer/start`,
    },
};

export const WS_ENDPOINTS = {
    SNIFFING: 'ws://localhost:8888/ws/sniffing',
    SNIFFING_STATE: 'ws://localhost:8888/ws/sniffing/state',
    DATA_IMSI: (campaignId) => `ws://localhost:8888/ws/data_imsi?campaign_id=${campaignId}`,
};


export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const REQUEST_TIMEOUT = 30000;

export default {
    API_BASE_URL,
    WS_BASE_URL,
    API_ENDPOINTS,
    WS_ENDPOINTS,
    DEFAULT_HEADERS,
    REQUEST_TIMEOUT,
};
