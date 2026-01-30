import Table from '../table/Table'

export default function ListDetailReport() {

    const columns = [
        { key: "no", label: "No" },
        { key: "imsi", label: "IMSI" },
        { key: "time", label: "Time" },
        { key: "count", label: "Count" },
        { key: "msisdn", label: "MSISDN" },
        { key: "provider", label: "Provider" },
    ]

    const data = [
        { no: "1", imsi: "123456789012345", time: "17:00:00", count: "5", msisdn: "1234567890", provider: "Telkomsel" },
        { no: "2", imsi: "123456789012346", time: "17:01:00", count: "3", msisdn: "0987654321", provider: "Indosat" },
        { no: "3", imsi: "123456789012347", time: "17:02:00", count: "12", msisdn: "1122334455", provider: "XL Axiata" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
        { no: "4", imsi: "123456789012348", time: "17:03:00", count: "8", msisdn: "5566778899", provider: "Smartfren" },
    ]

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[32vh] max-h-[32vh] overflow-auto">
            <div>
                <Table
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    )
}