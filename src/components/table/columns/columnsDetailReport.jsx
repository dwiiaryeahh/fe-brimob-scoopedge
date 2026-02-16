import React from 'react';
import { formatDateTime } from '../../../utils/formatDateTime';

export const columnsDetailReport = () => [
    { key: "no", label: "No" },
    {
        key: "timestamp", label: "Time",
        render: (row) =>
            formatDateTime(row.timestamp)
    },
    { key: "imsi", label: "IMSI" },
    { key: "count", label: "Count" },
    { key: "alert_status", label: "Alert Status" },
    { key: "alert_name", label: "Alert Name" },
];
