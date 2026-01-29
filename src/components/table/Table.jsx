import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

export default function Table({
    columns,
    data,
    loading = false,
    bgHeader = "#08682A",
    onRowClick,
}) {
    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FF62]"></div>
        </div>
    )

    if (!data || data.length === 0) return (
        <div className="p-12 text-center text-white/40 border border-white/10 rounded-xl bg-white/5">
            Data kosong
        </div>
    )

    return (
        <div className="w-full overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <TableHeader columns={columns} bg={bgHeader} />
                    <TableBody
                        columns={columns}
                        data={data}
                        onRowClick={onRowClick}
                    />
                </table>
            </div>
        </div>
    )
}
