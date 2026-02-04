import React from 'react';
import { formatDateTime } from '../../../utils/formatDateTime';

/**
 * Column definition for the Detail Report table
 * @returns {Array} List of column definitions
 */
export const columnsDetailReport = () => [
    { key: "no", label: "No" },
    {
        key: "timestamp", label: "Time",
        render: (row) =>
            formatDateTime(row.timestamp)
    },
    { key: "imsi", label: "IMSI" },
];
