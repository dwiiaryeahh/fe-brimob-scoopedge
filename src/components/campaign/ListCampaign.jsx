import Table from '../table/Table'
import Button from '../Button';
export default function ListCampaign() {

    const columns = [
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
                <Button
                    className='bg-[#0C8736]'
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`Action for ${row.imsi}`);
                    }}>
                    Target
                </Button>
            )
        },
    ]

    const data = [
        { no: "1", imsi: "1234567890", date: "2023-01-01 (17:00:00)", channel: 5, count: 5, provider: "Telkomsel", target: "1234567890" },
        { no: "2", imsi: "0987654321", date: "2023-01-02 (18:00:00)", channel: 3, count: 3, provider: "Indosat", target: "0987654321" },
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex justify-between items-center mt-1.5 mb-1.5'>
                <h3 className="text-xl font-bold text-white/90">IMSI Total (834)</h3>
            </div>
            <div className=''>
                <Table
                    columns={columns}
                    data={data}
                    onRowClick={(row) => console.log("Row clicked:", row)}
                />
            </div>
        </div>
    )
}