import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '../Button';
import Table from '../table/Table'
import ReportDetailModal from './ReportDetailModal';

export default function ListReport() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    console.log('selectedreport', selectedReport)

    const handleOpenDetail = (row) => {
        setSelectedReport(row)
        setIsModalOpen(true)
    }

    const columns = [
        { key: "no", label: "No" },
        { key: "campaign", label: "Campaign Name" },
        { key: "start_time", label: "Time Start" },
        { key: "stop_time", label: "Time Stop" },
        { key: "duration", label: "Duration" },
        { key: "imsi_count", label: "Imsi Count" },
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

    const data = [
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5,alert_count: 5, provider: "Telkomsel", target: "1234567890", status:"Completed", mode:"Blacklist"},
        { no: "2", campaign: "Campaign 2", start_time: "2023-01-02 (18:00:00)", stop_time: "2023-01-02 (19:00:00)", duration: "32:00:00", imsi_count: 3,alert_count: 3, provider: "Indosat", target: "0987654321", status:"Completed", mode:"Blacklist"},
        { no: "3", campaign: "Campaign 3", start_time: "2023-01-03 (10:00:00)", stop_time: "2023-01-03 (11:30:00)", duration: "01:30:00", imsi_count: 12,alert_count: 12, provider: "XL Axiata", target: "1122334455", status:"Completed", mode:"Blacklist"},
        { no: "4", campaign: "Campaign 4", start_time: "2023-01-04 (14:15:00)", stop_time: "2023-01-04 (15:45:00)", duration: "01:30:00", imsi_count: 8, alert_count: 8, provider: "Smartfren", target: "5566778899", status:"Completed", mode:"Blacklist"},
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[45vh] max-h-[45vh] overflow-auto">
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={handleOpenDetail}
                />
            </div>

            <ReportDetailModal
                title={selectedReport?.campaign ?? ""}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedReport}
            />
        </div>
    )
}