import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export const columnsCampaign = ({ handleTargetAction, isTargetExist, onSort, sortConfig }) => [
    { key: "no", label: "No" },
    { key: "imsi", label: "Imsi" },
    { key: "date", label: "Time" },
    { key: "channel", label: "Channel" },
    { key: "provider", label: "Provider" },
    {
        key: "rssi",
        label: (
            <div
                className="flex items-center justify-center gap-2 cursor-pointer hover:text-white transition-colors select-none"
                onClick={() => onSort && onSort('rssi')}
            >
                RSSI
                {sortConfig?.key === 'rssi' ? (
                    sortConfig.direction === 'asc' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                ) : (
                    <FaSort size={14} className="opacity-30" />
                )}
            </div>
        )
    },
    { key: "target", label: "Target" },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (row) => {
            const exists = isTargetExist ? isTargetExist(row.imsi) : false;

            if (exists) {
                return <span className='text-white/50 font-bold'>-</span>;
            }

            return (
                <button
                    className='bg-[#0C8736] text-white px-4 py-2 hover:brightness-110 transition-all font-semibold'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleTargetAction(row);
                    }}>
                    Target
                </button>
            );
        }
    },
];
