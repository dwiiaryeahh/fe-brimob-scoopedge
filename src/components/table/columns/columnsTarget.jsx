import React from 'react';

/**
 * Column definition for the Target table
 * @param {Object} params - Parameters for the columns
 * @param {Function} params.setSelectedTarget - Handler to set the selected target
 * @param {Function} params.setIsModalAddOpen - Handler to open the add/edit modal
 * @returns {Array} List of column definitions
 */
export const columnsTarget = ({ setSelectedTarget, setIsModalAddOpen }) => [
    { key: "no", label: "No" },
    {
        key: "name", label: "Name",
        render: (row) => (
            <span
                className="cursor-pointer underline hover:brightness-125 transition-all text-[#2AF170]"
                onClick={(e) => {
                    e.stopPropagation()
                    setSelectedTarget(row)
                    setIsModalAddOpen(true)
                }}
            >
                {row.name}
            </span>
        )
    },
    { key: "imsi", label: "Imsi" },
    { key: "date", label: "Last Update" },

    {
        key: "target_status",
        label: "Target Status",
        render: (row) => (
            <span
                className={`font-semibold ${row.target_status === "Inactive"
                    ? "text-red-500"
                    : "text-[#2AF170]"
                    }`}
            >
                {row.target_status}
            </span>
        )
    },
    {
        key: "alert_status",
        label: "Alert Status",
        render: (row) => (
            <span
                className={`font-semibold ${row.alert_status === "Inactive"
                    ? "text-red-500"
                    : "text-[#2AF170]"
                    }`}
            >
                {row.alert_status}
            </span>
        )
    },
];
