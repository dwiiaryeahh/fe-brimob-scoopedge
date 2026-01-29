import { FaSearch } from 'react-icons/fa';
import Button from '../Button';
import Table from '../table/Table'

export default function ListReport() {
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
                    alert(`Action for ${row.name}`);
                }} icon={<FaSearch />} >
                    Details
                </Button>
            )
        },
    ]

    const data = [
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "2", campaign: "Campaign 2", start_time: "2023-01-02 (18:00:00)", stop_time: "2023-01-02 (19:00:00)", duration: "32:00:00", imsi_count: 3, provider: "Indosat", target: "0987654321" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "1", campaign: "Campaign 1", start_time: "2023-01-01 (17:00:00)", stop_time: "2023-01-01 (18:00:00)", duration: "18:00:00", imsi_count: 5, provider: "Telkomsel", target: "1234567890" },
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[45vh] max-h-[45vh] overflow-auto">
            <div>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                />
            </div>
        </div>
    )
}