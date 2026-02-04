import React from 'react';

/**
 * Column definition for the Campaign table
 * @param {Object} params - Parameters for the columns
 * @param {Function} params.handleTargetAction - Handler for the target action button
 * @returns {Array} List of column definitions
 */
export const columnsCampaign = ({ handleTargetAction }) => [
    { key: "no", label: "No" },
    { key: "imsi", label: "Imsi" },
    { key: "date", label: "Time" },
    { key: "channel", label: "Channel" },
    { key: "count", label: "Count" },
    { key: "provider", label: "Provider" },
    { key: "target", label: "Target" },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (row) => (
            <button
                className='bg-[#0C8736] text-white px-4 py-2 rounded hover:brightness-110 transition-all font-semibold'
                onClick={(e) => {
                    e.stopPropagation();
                    handleTargetAction(row);
                }}>
                Target
            </button>
        )
    },
];
