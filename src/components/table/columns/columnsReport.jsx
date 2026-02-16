import React from "react";
import { FaSearch } from "react-icons/fa";
import { formatDateTime } from "../../../utils/formatDateTime";
import Button from "../../Button";

export const columnsReport = ({ handleOpenDetail }) => [
    { key: "no", label: "No" },
    { key: "name", label: "Campaign Name" },
    {
        key: "imsi",
        label: "Target IMSI",
        render: (row) => {
            if (!row.imsi) return "-";
            const imsis = row.imsi.split(/[\s,]+/);
            if (imsis.length > 1) {
                return (
                    <span title={row.imsi} className="cursor-help">
                        {imsis[0]}, ...
                    </span>
                );
            }
            return row.imsi;
        }
    },
    { key: "mode", label: "Mode" },
    {
        key: "duration",
        label: "Duration",
        render: (row) => {
            if (!row.start_scan || !row.stop_scan) return "-";

            const start = new Date(row.start_scan);
            const stop = new Date(row.stop_scan);
            const diffMs = stop - start;

            if (diffMs < 0) return "00:00:00";

            let totalSeconds = Math.floor(diffMs / 1000);

            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            const displayHours = String(hours).padStart(2, '0');
            const displayMinutes = String(minutes).padStart(2, '0');
            const displaySeconds = String(seconds).padStart(2, '0');

            return `${displayHours}:${displayMinutes}:${displaySeconds}`;
        }
    },
    { key: "crawling_count", label: "Imsi Count" },
    {
        key: "start_scan", label: "Time Start",
        render: (row) => (
            row.start_scan ? formatDateTime(row.start_scan) : "-"
        )
    },
    {
        key: "stop_scan", label: "Time Stop",
        render: (row) => (
            console.log(row.stop_scan),
            row.stop_scan ? formatDateTime(row.stop_scan) : "-"
        )
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (row) => (
            <Button onClick={(e) => {
                e.stopPropagation();
                handleOpenDetail(row);
            }} icon={<FaSearch />} >
                Details
            </Button>
        )
    },
]